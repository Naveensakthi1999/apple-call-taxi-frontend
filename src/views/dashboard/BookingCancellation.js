import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import { IconArrowNarrowRight,  } from '@tabler/icons-react';
import '../../assets/scss/mystyle.css';
import axios from 'axios';
import moment from 'moment';
import { API_BASE_URL } from '../../utils/config';

// ==============================|| ManagerOwner Function ||============================== //

function BookingCancellation() {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  axios.defaults.withCredentials = true;
  const fetchlength = () => {
    axios.get(`${API_BASE_URL}/booking/booking_cancel_count?search=${search}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result[0].count)
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/booking/booking_cancel_list?page=${page}&limit=${rowsPerPage}&search=${search}`)
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

  return (
    <MainCard
      title="Cancellation"
      secondary={
        <Link to="/dashboard/default">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
           DashBoard
          </Button>
        </Link>
      }
    >
      {/* TABLE SEARCH */}
        <div className="d-flex justify-content-end my-1  mx-2">
          <TextField id="filled-search" label="Search field" type="search" variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          />
        </div>

       {/* TABLE DATA */}
      <div className=" example">
        <table className="table table-hover">
          <thead className="fixed-header ">
            <tr>
              <th>S.NO</th>
              <th>Customer Name</th>
              <th>Car No</th>
              <th>Driver Name</th>
              <th>Reason</th>
              <th>Cancellation Date</th>
              <th>Booked by</th>
              <th>Cancelled by</th>
            </tr>
          </thead>
          { length>0 ?
          <tbody>
          {items.map((item, i) => (
            <tr key={item.id}>
              <th>{i + 1}</th>
              <td>{item.cust_name}</td>
              <td>{item.car_no}</td>
              <td>{item.driver_name}</td>
              <td>{item.cancel_reason}</td>
              <td>{moment(item.cancel_date).format("DD/MM/YYYY")}</td>
              <td>{item.staff_name}</td>
              <td>{item.cancel_staff_name}</td>
            </tr>
          ))}
          </tbody>
          : <tbody><td className='text-center' colSpan={8}>No matching records found</td></tbody>}
            </table>
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
    </MainCard>
  );
}



export default BookingCancellation