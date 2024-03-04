import '../../assets/scss/mystyle.css';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { TextField } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import dayjs from 'dayjs';
import moment from 'moment';
import Button from '@mui/material/Button';
// ==============================|| Customer Report Function ||============================== //

function CustomerReport() {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
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
    axios.get(`${API_BASE_URL}/report/customer_report_count?search=${search}&from=${dayjs(fromDate)}&to=${toDate}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result[0].count)
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/report/customer_report_list?page=${page}&limit=${rowsPerPage}&search=${search}&from=${dayjs(fromDate)}&to=${toDate}`)
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

  const Print = () => {
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
  
    // Open a new window to apply print styles
    let printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Booking History</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(`
    <style> @media print { 
    /* Define regular styles for the table */
    table {
      border-collapse: collapse;
      width: 100%;
      /* Add other table styles */
    }
    
    table, th, td {
      border: 1px solid black;
      /* Define border or other styles */
    }
    
    th, td {
      padding: 8px;
      text-align: left;
      /* Define padding, alignment, or other styles */
    }
    
    /* Define print-specific styles */
    @media print {
      table {
        /* Adjust styles for printing */
        font-size: 12px; /* Example: Set a specific font size for printing */
        /* Add other print-specific styles */
      }
    }
    }</style>
    `); // Include print-specific styles
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
  
    printWindow.print(window.location.reload());
    printWindow.close(window.location.reload());
  
    document.body.innerHTML = originalContents;
  }

  return (
    <MainCard title="Customer Report">
      <div>
    
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

        <div className="row mt-4">
          <div className="col-6 col-sm-12 col-lg-6 my-2">
            <Button
                autoFocus
                variant="contained"
                onClick={Print}
              >
                Print
            </Button>
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            {/*  Table Search */}
            <div className="d-flex justify-content-end my-2">
              <TextField id="filled-search" label="Search field" type="search" variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
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

        {/* Table DATA */}
        <div className=" example" id='printablediv' style={{overflowX:'auto'}}>
          <table className="table table-hover">
            <thead className="fixed-header ">
              <tr>
                <th>S.NO</th>
                <th>Mobile</th>
                <th>Customer</th>
                <th>Pickup - Drop</th>
                <th>LandMark</th>
                <th>Date & Time</th>
                <th>Booked By</th>
                <th>Paid By</th>
                <th>Cancel By</th>
                <th>Car Details</th>
                <th>Amt</th>
              </tr>
            </thead>
            {length>0 ?
            <tbody>
            {items.map((item, i) => (
                <tr key={item.id}>
                <th>{i + 1}</th>
                <td>{item.mobile}</td>
                <td>{item.cust_name}</td>
                <td>{item.from_loaction}-{item.to_loaction}</td>
                <td>{item.land_mark}</td>
                <td>{moment(item.pickup_date).format("DD/MM/YYYY")} @ {moment(item.pickup_time).format("hh:mm A")}</td>
                <td>{item.staff_name}</td>
                <td>{item.pay_staff_name}</td>
                <td>{item.cancel_staff_name}</td>
                <td>{item.car_no}<br/>{item.driver_name}</td>
                <td>{item.total_amount}</td>
              </tr>
            ))}
            </tbody>
            : <tbody><td className='text-center' colSpan={11}>No matching records found</td></tbody>}
           </table>
        </div>

      </div>
    </MainCard>
  );
}

export default CustomerReport;
