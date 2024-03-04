import React, { useState, useEffect } from 'react';
import '../../assets/scss/mystyle.css';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';

function PaidCallCenterFess() {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [date, setdate] = useState(new Date());

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  axios.defaults.withCredentials = true;

  const fetchlength = () => {
    axios.get(`${API_BASE_URL}/callcenterfess/paidcallcenterfess_count?search=${search}&date=${date}`)
      .then(result => {
        if (result.data.Status) {
          setLength(result.data.Result[0].count)
        }
      })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/callcenterfess/paidcallcenterfess_list?page=${page}&limit=${rowsPerPage}&search=${search}&date=${date}`)
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
  }, [page, rowsPerPage, search, date]);
  
  return (
    <>
      <div className="row">
        <div className="col-6 col-sm-12 col-lg-6">
          <div className="my-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label={'"month" and "year"'} views={['month', 'year']}
                value={dayjs(date)}
                onChange={(dateValue) => setdate(new Date(dateValue))}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
          <div className="d-flex justify-content-end my-2">
            <TextField id="filled-search" label="Search field" type="search" variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* table-fixed */}
      <div className=" example">
        <table className="table table-hover">
          <thead className="fixed-header ">
            <tr>
              <th>S.NO</th>
              <th>Owner Name</th>
              <th>Mobile</th>
              <th>Car No</th>
              <th>Car Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          {length > 0 ?
            <tbody>
              {items.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <th>{i + 1}</th>
                    <td>{item.firstname}</td>
                    <td>{item.mobile}</td>
                    <td>{item.car_no}</td>
                    <td>{item.carname}</td>
                    <td>{item.amount}</td>
                  </tr>
                );
              })}

            </tbody>
            : <tbody><td className='text-center' colSpan={9}>No matching records found</td></tbody>}
        </table>
      </div>

      {/* TABLE PAGINATION */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={length}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default PaidCallCenterFess;
