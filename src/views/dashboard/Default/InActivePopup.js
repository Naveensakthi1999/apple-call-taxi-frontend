import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import moment from 'moment';
import { API_BASE_URL } from '../../../utils/config';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }));

function InActivePopup(props) {
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
    axios.get(`${API_BASE_URL}/managecar/managecar_inactive_count?search=${search}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result[0].count)
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/managecar/managecar_inactive_list?page=${page}&limit=${rowsPerPage}&search=${search}`)
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
              window.location.reload();
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
      }
    });
  }

  return (
    <div >
      <BootstrapDialog onClose={()=>{props.modal(false)}} aria-labelledby="customized-dialog-title" open={props.data}>
        
        <DialogTitle sx={{ m: 0, p: 2, fontSize: 18 }} id="customized-dialog-title">
          Inactive Car
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={()=>{props.modal(false)}}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
        <CloseIcon />
        </IconButton>
        {/* TABLE SEARCH */}
        <div className="d-flex justify-content-end my-1  mx-2">
          <TextField id="filled-search" label="Search field" type="search" variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DialogContent dividers>
          <div className=" example">
            <table className="table table-hover">
              <thead className="fixed-header ">
                <tr>
                  <th>S.NO</th>
                  <th>Driver&nbsp;Name</th>
                  <th>Owner&nbsp;Name</th>
                  <th>Car&nbsp;No</th>
                  <th>Reason</th>
                  <th>InActive&nbsp;Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              { length>0 ?
          <tbody>
          {items.map((item, i) => (
            <tr key={item.id}>
              <th>{i + 1}</th>
              <td>{item.driver_name}</td>
              <td>{item.owner_name}</td>
              <td>{item.car_no}</td>
              <td>{item.reason_inactive}</td>
              <td>{moment(item.inactive_date).format("DD/MM/YYYY")}</td>
              <td>
                <Button variant="contained" type="button" style={{backgroundColor: "red"}} 
                onClick={() => {
                  handleActive(item.id);
                }}
                >
                  Inactive
                </Button>
              </td>
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

        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={()=>{props.modal(false)}}>
            close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default InActivePopup;
