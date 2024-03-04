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
// ==============================|| ManagerOwner Function ||============================== //

function ManageDriver() {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [deleteBy, setDeleteBy] = useState();
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
    axios.get(`${API_BASE_URL}/managedriver/managedriver_count?search=${search}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result[0].count)
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/managedriver/managedriver_list?page=${page}&limit=${rowsPerPage}&search=${search}`)
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
        axios.put(`${API_BASE_URL}/managedriver/delete_managedriver/`+id, {deleteBy})
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
    withReactContent(Swal)
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes, InActive it!"
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "InActive!",
          text: "Your Date has been InActive.",
          icon: "success"
        });
        const status ="inactive";
        axios.put(`${API_BASE_URL}/managedriver/status_managedriver/`+id, {status})
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
        axios.put(`${API_BASE_URL}/managedriver/status_managedriver/`+id, {status})
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
      title="Manage Driver"
      secondary={
        <Link to="/master/AddManageDriver">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Add Manage Driver
          </Button>
        </Link>
      }
    >


      {/* TABLE SERACH */}
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
      <div className=" example">
        <table className="table table-hover">
          <thead className="fixed-header ">
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Aadhar Img</th>
              <th>Aadhar Img back</th>
              <th>driving Licence Img </th>
              <th>driving Licence Img back</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          { length>0 ?
          <tbody>
          {items.map((item, i) => (
            <tr key={item.id}>
              <th>{i + 1}</th>
              <td>{item.firstname} {item.lastname}</td>
              <td>{item.mobile}</td>
              <td>
                <Zoom>
                <img
                  src={`${API_BASE_URL}/Images/` + item.addharfrontside_image}
                  alt="addharfrontpic"
                  style={{ width: '100px', height: 'auto' }}
                  role="presentation"
                />
                </Zoom>
              </td>
              <td>
                <Zoom>
                <img
                 src={`${API_BASE_URL}/Images/` + item.addharbackside_image}
                  alt="addharbackpic"
                  style={{ width: '100px', height: 'auto' }}
                  role="presentation"
                />
                </Zoom>
              </td>
              <td>
                <Zoom>
                <img
                  src={`${API_BASE_URL}/Images/` + item.drivingfrontside_image}
                  alt="Drivingpic"
                  style={{ width: '100px', height: 'auto' }}
                  role="presentation"
                />
                </Zoom>
              </td>
              <td>
                <Zoom>
                <img
                  src={`${API_BASE_URL}/Images/` + item.drivingbackside_image}
                  alt="Drivingbackpic"
                  style={{ width: '100px', height: '60px' }}
                  role="presentation"
                />
                </Zoom>
              </td>
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
                <Link to={`/master/EditManageDriver/` + item.id}>
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
          : <tbody><td className='text-center' colSpan={7}>No matching records found</td></tbody>}
        </table>
      </div>
      
    </MainCard>
  );
}

export default ManageDriver;
