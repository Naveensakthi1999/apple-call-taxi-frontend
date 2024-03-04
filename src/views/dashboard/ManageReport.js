import '../../assets/scss/mystyle.css';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { TextField } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ManageReportPopup from './ManageReportPopup';
import ManageReportCount from './ManageReportCount';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import dayjs from 'dayjs';
// ==============================|| Customer Report Function ||============================== //


function ManageReport() {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(false);
  const currentDate = new Date();
  const [fromDate, setFromDate] = useState(new Date(currentDate).setMonth(currentDate.getMonth() - 1));
  const [toDate, setToDate] = useState(new Date().toLocaleDateString());

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  axios.defaults.withCredentials = true;

  const fetchlength = () => {
    axios.get(`${API_BASE_URL}/managereport/managereport_count?search=${search}&from=${dayjs(fromDate)}&to=${toDate}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result[0].count)
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/managereport/managereport_list?page=${page}&limit=${rowsPerPage}&search=${search}&from=${dayjs(fromDate)}&to=${toDate}`)
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
  }, [page, rowsPerPage, search, fromDate, toDate]);

  const handleHistory = (id) => {
    setHistory(id);
    setOpen(true);
  }

  const handleHistoryClose = (e) => {
    setOpen(e);
    window.location.reload();
  };

  return (
    <MainCard title="Manage Report">
      <div>
        {/* CARD */}
        <ManageReportCount/>

        {/* FROM TO DATE PICKER */}
        <div className="row mt-4">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" className="w-75"
                value={dayjs(fromDate)}
                format="DD/MM/YYYY"
                onChange={(dateValue) => setFromDate(new Date(dateValue).toLocaleDateString())}
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="To" className="w-75" 
               value={dayjs(toDate)}
               format="DD/MM/YYYY"
               onChange={(dateValue) => setToDate(new Date(dateValue).toLocaleDateString())}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* POP-UP */}
        <ManageReportPopup data={open} id={history} from={fromDate} to={toDate} handleClose={handleHistoryClose}  />

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
        <div className=" example">
          <table className="table table-hover">
            <thead className="fixed-header ">
              <tr>
                <th>S.NO</th>
                <th>Car No</th>
                <th>Car Name</th>
                <th>Total Amt</th>
                <th>Total Kms</th>
                <th>Total Trips</th>
                <th>Driver Name</th>
                <th>Owner Name</th>
              </tr>
            </thead>
            {length>0 ?
            <tbody>
            {items.map((item, i) => (
                <tr
                    key={item.id}
                    onClick={() => 
                        handleHistory(item.id)
                      }
                  >
                <th>{i + 1}</th>
                <td>{item.car_no}</td>
                <td>{item.car_name}</td>
                <td>{item.total_amount}</td>
                <td>{item.total_km}</td>
                <td>{item.total_trip}</td>
                <td>{item.driver_name}</td>
                <td>{item.owner_name}</td>
              </tr>
            ))}
            </tbody>
            : <tbody><td className='text-center' colSpan={8}>No matching records found</td></tbody>}
           </table>
        </div>

      </div>
    </MainCard>
  );
}

export default ManageReport;
