import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }));

function ManageReportPopup(props) {
  const id = props.id;
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [details, setDetails] = useState([]);
  const [items, setItems] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  axios.defaults.withCredentials = true;
  const fetchDataDetails = () => {
    axios.get(`${API_BASE_URL}/managereport/managereport_details?id=${id}&from=${dayjs(props.from)}&to=${props.to}`)
      .then((result) => {
        if (result.data.Status) {
          setDetails(result.data.Result[0]);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const fetchlength = () => {
    axios.get(`${API_BASE_URL}/managereport/managereport_details_count?search=${search}&id=${id}&from=${dayjs(props.from)}&to=${props.to}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result[0].count)
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/managereport/managereport_details_list?page=${page}&limit=${rowsPerPage}&search=${search}&id=${id}&from=${dayjs(props.from)}&to=${props.to}`)
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
    fetchDataDetails();
    fetchData();
    fetchlength();
  }, [id, page, rowsPerPage, search]);

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
    <div>
      <BootstrapDialog onClose={()=>{props.handleClose(false)}} aria-labelledby="customized-dialog-title" open={props.data}>

        <DialogTitle sx={{ m: 0, p: 2, fontSize: 18 }} id="customized-dialog-title">
          Trip Details
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={()=>{props.handleClose(false)}}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

          <div className="row">
            <div className="col-4 d-flex align-items-center flex-column">
              <h6>Car No</h6>
              <p>{details.car_no}</p>
            </div>
            <div className="col-4 d-flex align-items-center flex-column">
              <h6>Owner</h6>
              <p>{details.owner_name}</p>
            </div>
            <div className="col-4 d-flex align-items-center flex-column">
              <h6>Driver</h6>
              <p>{details.driver_name}</p>
            </div>
          </div>

        {/* TABLE SEARCH */}
        <div className="d-flex justify-content-end my-2">
          <TextField id="filled-search" label="Search field" type="search" variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          />
        </div>

          <div className=" example" id='printablediv'>
            <table className="table table-hover">
              <thead className="fixed-header ">
                <tr>
                  <th>S.NO</th>
                  <th>Date&nbsp;&&nbsp;Time</th>
                  <th>Pickup - Drop</th>
                  <th>Kms</th>
                  <th>Amt</th>
                  <th>Booked&nbsp;by</th>
                  <th>Payment&nbsp;by</th>
                  <th>Cancel&nbsp;by</th>
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
                  <td>{moment(item.pickup_date).format("DD/MM/YYYY")} @ {moment(item.pickup_time).format("hh:mm A")}</td>
                  <td>{item.from_loaction} - {item.to_loaction}</td>
                  <td>{item.total_km}</td>
                  <td>{item.amount}</td>
                  <td>{item.staff_name}</td>
                  <td>{item.pay_staff_name}</td>
                  <td>{item.cancel_staff_name}</td>
                </tr>
              ))}
              </tbody>
              : <tbody><td className='text-center' colSpan={8}>No matching records found</td></tbody>}
              <tfoot>
                {/* total Trips */}
                <td></td>
                <td  style={{fontWeight:"bold",fontSize:"1rem",textAlign:"center"}}>Total</td>
                <td style={{fontWeight:"bold",fontSize:"1rem",textAlign:"center"}}>{details.total_trip}</td>
                {/* total Kms */}
                <td colSpan={1} style={{fontWeight:"bold",fontSize:"1rem",textAlign:"center"}} >{details.total_km}</td>
                {/* total Amount */}
                <td colSpan={1} style={{fontWeight:"bold",fontSize:"1rem",textAlign:"center"}}>{details.total_amount}</td>
               <td colSpan={3}></td>
              </tfoot>
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
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={Print}
          >
            Print
          </Button>
          <Button autoFocus variant="outlined" onClick={()=>{props.handleClose(false)}}>
            close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default ManageReportPopup;
