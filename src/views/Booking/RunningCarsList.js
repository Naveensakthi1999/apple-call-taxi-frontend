import React, { useState, useEffect } from 'react';
import '../../assets/scss/mystyle.css';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import RunningCarsPopup from './RunningCarsPopup';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import moment from 'moment';

// ===============================|| Running Cars ||=============================== //

function RunningCarsList() {
    const [length, setLength] = useState();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [payment, setPayment] = useState(false);
    const [perKmValue, setPerKmValue] = useState('');
    const [driverId, setDriverId] = useState('');
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage+1);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(1);
    };
  
    axios.defaults.withCredentials = true;
  
    const fetchlength = () => {
      axios.get(`${API_BASE_URL}/runningcars/runningcars_count?search=${search}`)
      .then(result => {
        if(result.data.Status) {
          setLength(result.data.Result[0].count)
        }
      })
    }
  
    const fetchData = () => {
      axios.get(`${API_BASE_URL}/runningcars/runningcars_list?page=${page}&limit=${rowsPerPage}&search=${search}`)
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
  
    const handlePayment = (id, km_value, driver_id) => {
      setPayment(id);
      setOpen(true);
      setPerKmValue(km_value);
      setDriverId(driver_id);
    }
  
    const handlePaymentClose = (e) => {
      setOpen(e);
    };

    useEffect(() => {
      axios.get(`${API_BASE_URL}/availablestatus/availablecar_status`)
      .then((result) => {
        if (result.data.Status) {
          console.log("Available Status Successfully");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    }, []);

  return (
         <>
         {/* POP-UP */}
         <RunningCarsPopup data={open} 
         id={payment} 
         km_value={perKmValue} 
         driver_id={driverId} 
         handleClose={handlePaymentClose} 
         />

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
          <div className=" example" style={{overflowX:'auto'}}>
            <table className="table table-hover">
              <thead className="fixed-header ">
                <tr>
                  <th>S.NO</th>
                  <th>Booking Id</th>
                  <th>Date & Time</th>
                  <th>Driver</th>
                  <th>Customer Name</th>
                  <th>Customer Mobile</th>
                  <th>Car Model</th>
                  <th>Pickup</th>
                  <th>Drop</th>
                  <th>Payment</th>
                  <th>Booked by</th>
                  <th>Status</th>
                </tr>
              </thead>
            { length>0 ?
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
                  color = 'blue';
              } else if (currentDate >= beforePickup && item.status === 'Waiting') {
                  color = 'red';
              }
              
              return (
                <tr key={item.id} style={{ color: color }}>
                  <th>{i + 1}</th>
                  <td>
                    <React.Fragment>
                      <Button variant="text" 
                        onClick={() => {
                            handlePayment(item.id, item.per_kms, item.driver_id);
                        }} >
                            {item.booking_id}
                        </Button>
                    </React.Fragment>
                  </td>
                  <td>{moment(item.pickup_date).format("DD/MM/YYYY")} @ {moment(item.pickup_time).format("hh:mm A")}</td>
                  <td>{item.driver_name}</td>
                  <td>{item.cust_name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.car_name}</td>
                  <td>{item.from_loaction}</td>
                  <td>{item.to_loaction}</td>
                  <td>{item.payment_status}</td>
                  <td>{item.staff_name}</td>
                  <td>{item.status}</td>
                </tr>
                );
              })}
              </tbody>
              : <tbody><td className='text-center' colSpan={12}>No matching records found</td></tbody>}
              </table>
          </div>

        </>
  );
}

export default RunningCarsList;
