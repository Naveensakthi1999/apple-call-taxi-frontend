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

function ManageBookingPopup(props) {
  const id = props.id;
  const [values, setValues] = useState({
    cancel_date: new Date().toLocaleDateString(),
    cancel_reason: '',
    status: 'Cancel',
    cancel_by: ''
  })

  axios.defaults.withCredentials = true;
  useEffect(() => {
   axios.get(`${API_BASE_URL}/verify`)
     .then(result => {
       if (result.data.Status) {
        setValues(prevValues => ({ ...prevValues, cancel_by: result.data.id }));
       }
     }).catch(err => console.log(err))
 }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (values.cancel_reason === '' || values.cancel_by === '') {
      withReactContent(Swal)
        .fire({
          title: 'Please enter a required field.'
        });
    } else {
      axios.put(`${API_BASE_URL}/booking/cancel_booking/` + id, { values })
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
          Cancellation Reason
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
        <DialogContent dividers style={{width: '500px'}}>

          <div className="row mt-3 mb-3">
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-1">
              <TextField
                id="outlined-multiline-flexible"
                label="Reason"
                multiline
                className='w-75'
                maxRows={4}
                value={values.cancel_reason}
                onChange={(e) => setValues({ ...values, cancel_reason: e.target.value })}
              />
            </div>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} autoFocus variant="contained">
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
      </BootstrapDialog>
    </div>
  );
}


export default ManageBookingPopup