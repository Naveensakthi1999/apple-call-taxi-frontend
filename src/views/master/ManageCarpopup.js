import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';
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

function ManageCarpopup(props) {
  const id = props.id;
  const [values, setValues] = useState({
    inactive_date: new Date().toLocaleDateString(),
    reason_inactive: '',
    status: 'Inactive'
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (values.inactive_date === '' || values.reason_inactive === '') {
      withReactContent(Swal)
        .fire({
          title: 'Please enter a required field.'
        });
    } else {
      axios.put(`${API_BASE_URL}/managecar/inactive_status_managecar/` + id, { values })
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
          In-Active Reason
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
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center mb-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date" className="w-75"
                  value={dayjs(values.inactive_date)}
                  format="DD/MM/YYYY"
                  onChange={(dateValue) => setValues({ ...values, inactive_date: new Date(dateValue).toLocaleDateString() })}
                />
              </LocalizationProvider>
            </div>
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-1">
              <TextField
                id="outlined-multiline-flexible"
                label="Reason"
                multiline
                className='w-75'
                maxRows={4}
                value={values.reason_inactive}
                onChange={(e) => setValues({ ...values, reason_inactive: e.target.value })}
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

export default ManageCarpopup;
