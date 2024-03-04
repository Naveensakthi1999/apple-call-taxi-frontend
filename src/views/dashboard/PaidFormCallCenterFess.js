import React, { useState,useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function PaidFromCallCenterFess(props) {
  const carid = props.carid;
  const paidBy = props.paidBy;
  const totalAmount = props.totalAmount;
  const pendingAmount = props.pendingAmount;
  const date = props.date;
  const [items, setItems] = useState([]);
  const [deleteBy, setDeleteBy] = useState();

  const [values, setValues] = useState({
    date: '',
    carid: '',
    paidBy: '',
    totalAmount: '',
    pendingAmount: '',
    paidAmount: ''
  })

  useEffect(() => {
    setValues({ ...values, carid: carid,  paidBy: paidBy, totalAmount: totalAmount, pendingAmount: pendingAmount, date: date})
    setDeleteBy(paidBy);
  }, [carid, paidBy, totalAmount, pendingAmount, date])

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault()

    if (values.date === '' || values.paidAmount === '' || values.carid === '' || values.paidBy === '' || values.totalAmount === '' || values.pendingAmount === '' ) {
      withReactContent(Swal)
        .fire({
          title: 'Please enter a required field.'
        });
    } else {
      axios.post(`${API_BASE_URL}/callcenterfess/paid_callcenterfess` , { values })
        .then(result => {
          if (result.data.Status) {
            window.location.reload();
          } else {
            alert(result.data.Error)
          }
        })
        .catch(err => console.log(err))
    }
  }

const fetchData = () => {
    axios.get(`${API_BASE_URL}/callcenterfess/paidFormcallcenterfess_list?carid=${carid}&date=${date}`)
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
    fetchData();
}, [carid, date]);

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
        axios.put(`${API_BASE_URL}/callcenterfess/deletePaidFormcallcenterfess_list/`+id, {deleteBy})
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
    <div>
      <BootstrapDialog
        onClose={() => {
          props.handleClose(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={props.data}
      >
        <DialogTitle sx={{ m: 0, p: 2, fontSize: 18 }} id="customized-dialog-title">
          Running Cars 
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={() => {
            props.handleClose(false);
          }}
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
          <div className="row mt-3 mb-3">
            
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-2">
              <TextField id="outlined-basic" label="Total Amount" variant="outlined" className="w-75" 
                value={values.totalAmount}
              />
            </div>
            
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-2">
              <TextField id="outlined-basic" label="Pending Amount" variant="outlined" className="w-75" 
                value={values.pendingAmount}
              />
            </div>

            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-2">
              <TextField id="outlined-basic" label="Paid Amount" variant="outlined" className="w-75" 
                value={values.paidAmount}
                onChange={(e) => setValues({ ...values, paidAmount: e.target.value })}
              />
            </div>

          </div>
        <DialogActions>
          <Button 
          onClick={handleSubmit} 
          autoFocus variant="contained">
            Save
          </Button>
          <Button
            autoFocus
            variant="outlined"
            onClick={() => {
              props.handleClose(false);
            }}
          >
            close
          </Button>
        </DialogActions>

        <div className="example" style={{paddingLeft: "50px", paddingRight: '50px'}}>
            <table className="table table-hover">
                <thead className="fixed-header ">
                    <tr>
                        <th>S.NO</th>
                        <th>Paid Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {items.length > 0 ?
                    <tbody>
                        {items.map((item, i) => {
                            return (
                                <tr key={item.id}>
                                    <th>{i + 1}</th>
                                    <td>{item.amount}</td>
                                    <td>
                                    <Tooltip title="Delete">
                                        <IconTrash color="red" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)} />
                                    </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    : <tbody><td className='text-center' colSpan={6}>No matching records found</td></tbody>}
            </table>
        </div>

        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default PaidFromCallCenterFess;
