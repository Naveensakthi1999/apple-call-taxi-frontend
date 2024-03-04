import '../../assets/scss/mystyle.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowNarrowRight, IconEdit, IconTrash } from '@tabler/icons-react';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import moment from 'moment';
import ManageCarpopup from './ManageCarpopup';
// ==============================|| ManagerOwner Function ||============================== //

function ManageCars() {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [deleteBy, setDeleteBy] = useState();
  const [open, setOpen] = useState(false);
  const [inActiveID, setInActiveID] = useState(false);
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
    axios.get(`${API_BASE_URL}/managecar/managecar_count?search=${search}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result[0].count)
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/managecar/managecar_list?page=${page}&limit=${rowsPerPage}&search=${search}`)
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
        axios.put(`${API_BASE_URL}/managecar/delete_managecar/`+id, {deleteBy})
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

  const handleInActive = (id) => {
    setInActiveID(id);
    setOpen(true);
  }

  const handleInActiveClose = (e) => {
    setOpen(e);
  };

  const handleActive = (id) => {
    withReactContent(Swal)
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes, Active it!"
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Active!",
          text: "Your Date has been Active.",
          icon: "success"
        });
        const status ="active";
        axios.put(`${API_BASE_URL}/managecar/active_status_managecar/`+id, {status})
        .then(result => {
            if(result.data.Status) {
              fetchData();
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
      }
    });
  }

  return (
    <MainCard
      title="Manage Cars"
      secondary={
        <Link to="/master/AddManageCars">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Add Manage Cars
          </Button>
        </Link>
      }
    >
      {/* TABLE SEARCH */}
      <div className="d-flex justify-content-end my-2">
        <TextField id="filled-search" label="Search field" type="search" variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ManageCarpopup data={open} id={inActiveID} handleClose={handleInActiveClose}/>

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
              <th>Name</th>
              <th>Car Img</th>
              <th>Seat</th>
              {/* <th>Ac/NonAc</th> */}
              <th>Driver</th>
              <th>Owner</th>
              <th>Location</th>
              <th>Fc Date</th>
              <th>Insurance Date</th>
              <th>TAX Date</th>
              <th>Status </th>
              <th>Action</th>
            </tr>
          </thead>
          { length>0 ?
          <tbody>
          {items.map((item, i) => (
            <tr key={item.id}>
              <th>{i + 1}</th>
              <td>{item.carname}</td>
              <td>
                <Zoom>
                <img
                  src={`${API_BASE_URL}/Images/` + item.car_image}
                  alt="addharfrontpic"
                  style={{ width: '100px', height: 'auto' }}
                  role="presentation"
                />
                </Zoom>
              </td>
              <td>{item.no_seats}</td>
              {/* <td>{item.ac_or_non_ac}</td> */}
              <td>{item.driver_name}</td>
              <td>{item.owner_name}</td>
              <td>{item.location}</td>
              <td>{moment(item.fc_date).format("DD/MM/YYYY")}</td>
              <td>{moment(item.insurance_date).format("DD/MM/YYYY")}</td>
              <td>{moment(item.tax_date).format("DD/MM/YYYY")}</td>
              <td>
                {item.status === 'active' ?
                <Button variant="contained" type="button" color="secondary" 
                onClick={() => {
                  handleInActive(item.id);
                }}
                >
                  Active
                </Button>
                :
                <Button variant="contained" type="button" style={{backgroundColor: "red"}} 
                onClick={() => {
                  handleActive(item.id);
                }}
                >
                  Inactive
                </Button>
                }
              </td>
              <td>
                <Link to={`/master/EditManageCars/` + item.id}>
                <Tooltip title="Edit">
                  <IconEdit color="green" style={{ cursor: 'pointer' }} />
                </Tooltip>
                </Link>
                {' '}
                { userType === 'admin' ? 
                <Tooltip title="Delete">
                  <IconTrash color="red" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)}/>
                </Tooltip> : ''
                }
              </td>
            </tr>
          ))}
          </tbody>
          : <tbody><td className='text-center' colSpan={12}>No matching records found</td></tbody>}
        </table>
      </div>

    </MainCard>
  );
}

export default ManageCars;
