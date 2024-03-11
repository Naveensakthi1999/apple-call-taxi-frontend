import '../../assets/scss/mystyle.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import { IconArrowNarrowRight, IconEdit, IconTrash } from '@tabler/icons-react';
import ManageBookingPopup from "./ManageBookingPopup"
import Tooltip from '@mui/material/Tooltip';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import moment from 'moment';
// ==============================|| ManagerOwner Function ||============================== //

function ManageBooking() {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [deleteBy, setDeleteBy] = useState();
  const [open, setOpen] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [userType, setUserType] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
   axios.get(`${API_BASE_URL}/verify`)
     .then(result => {
       if (result.data.Status) {
        setDeleteBy(result.data.id);
        setUserType(result.data.role);
       }
     }).catch(err => console.log(err))
 }, [])

  const fetchlength = () => {
    axios.get(`${API_BASE_URL}/booking/booking_count?search=${search}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result[0].count)
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/booking/booking_list?page=${page}&limit=${rowsPerPage}&search=${search}`)
      .then((result) => {
        if (result.data.Status) {
          setItems(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchlength();
    fetchData();
  }, [page, rowsPerPage, search]);

  const handleDelete = (id) => {
    
    withReactContent(Swal)
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes, delete it!"
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        axios.put(`${API_BASE_URL}/booking/delete_booking/`+id, {deleteBy})
        .then(result => {
            if(result.data.Status) {
              fetchData();
              fetchlength();
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
      }
    });
  }

  const handleCancel = (id) => {
    setCancel(id);
    setOpen(true);
  }

  const handleCancelClose = (e) => {
    setOpen(e);
  };

  return (
    <MainCard
      title="Manage Booking "
      secondary={
        <Link to="/Booking/AddManageBooking">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Add Booking
          </Button>
        </Link>
      }
    >

      {/* Pop Up */}
      <ManageBookingPopup data={open} id={cancel} handleClose={handleCancelClose} />


      {/* TABLE SEARCH */}
      <div className="d-flex justify-content-end my-2">
        <TextField id="filled-search" label="Search field" type="search" variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE PAGINATION */}
     <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={length}
        rowsPerPage={rowsPerPage}
        page={page-1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

       {/* TABLE DATA */}
      <div className="example" style={{overflowX:'auto'}}>
        <table className="table table-hover">
          <thead className="fixed-header ">
            <tr>
              <th>S.NO</th>
              <th>Booking Id</th>
              <th>Driver</th>
              <th>Driver Mobile</th>
              <th>Customer Name</th>
              <th>Customer Mobile</th>
              <th>Date&nbsp;&&nbsp;Time</th>
              <th>Pickup - Drop</th>
              <th>Car Model</th>
              <th>Payment</th>
              <th>Booked By</th>
              <th>Payment By</th>
              <th>Status</th>
              <th>Cancel</th>
              <th>Action</th>
            </tr>
          </thead>
          {items.length > 0 ? (
            <tbody>
              {items.map((item, i) => {
                let color = '';
                const currentDate = new Date();
                const pickupDateTime = new Date(item.pickup_time);
                const tomorrowDate = new Date(currentDate);
                tomorrowDate.setDate(tomorrowDate.getDate() + 1);
                const lateDropDateTime = new Date(pickupDateTime);
                lateDropDateTime.setDate(lateDropDateTime.getDate() + 1);
                const beforePickup = new Date(pickupDateTime);
                beforePickup.setMinutes(beforePickup.getMinutes() - 30);
                if (currentDate >= pickupDateTime && item.status === 'Waiting') {
                    if (currentDate >= lateDropDateTime) {
                        color = '#ff00e9';
                    } else {
                        color = 'green';
                    }
                } else if (moment(pickupDateTime).format("DD-MM-YYYY") >= moment(tomorrowDate).format("DD-MM-YYYY") && item.status === 'Waiting') {
                  if(moment(pickupDateTime).format("DD-MM-YYYY") === moment(tomorrowDate).format("DD-MM-YYYY") && item.status === 'Waiting'){
                    color = 'blue';
                  } else {
                    color = '#fc9700';
                  }
                } else if (currentDate >= beforePickup && item.status === 'Waiting') {
                    color = 'red';
                }

                return (
                    <tr key={item.id} style={{ color: color }}>
                        <th>{i + 1}</th>
                        <td>{item.booking_id}</td>
                        <td>{item.driver_name}</td>
                        <td>{item.driver_mobile}</td>
                        <td>{item.cust_name}</td>
                        <td>{item.mobile}</td>
                        <td>
                            {moment(item.pickup_date).format("DD-MM-YYYY")} @
                            {moment(item.pickup_time).format("hh:mm A")}
                        </td>
                        <td>{item.from_loaction} - {item.to_loaction}</td>
                        <td>{item.car_name}</td>
                        <td>{item.payment_status}<br />{item.amount !== '' ? 'Rs.' + item.amount : ''}</td>
                        <td>{item.staff_name}</td>
                        <td>{item.pay_staff_name}</td>
                        <td>{item.status}</td>
                        <td>
                            {item.status === 'Waiting' ? (
                                <CancelIcon
                                    onClick={() => {
                                        handleCancel(item.id);
                                    }}
                                    style={{ color: "red", fontSize: "2rem", cursor: "pointer" }}
                                />
                            ) : (
                                <div>{item.cancel_staff_name}</div>
                            )}
                        </td>
                        <td>
                            <Link to={`/Booking/EditManageBooking/${item.id}`}>
                                <Tooltip title="Edit">
                                    <IconEdit color="green" style={{ cursor: 'pointer' }} />
                                </Tooltip>
                            </Link>
                            {' '}
                            {userType === 'admin' && (
                                <Tooltip title="Delete">
                                    <IconTrash color="red" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)} />
                                </Tooltip>
                            )}
                        </td>
                    </tr>
                );
            })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className='text-center' colSpan={16}>No matching records found</td>
              </tr>
            </tbody>
          )}
         </table>
      </div>
    </MainCard>
  );
}

export default ManageBooking;   
