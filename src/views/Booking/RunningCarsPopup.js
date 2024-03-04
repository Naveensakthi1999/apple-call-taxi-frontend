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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import Autocomplete from '@mui/material/Autocomplete';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function RunningCarsPopup(props) {
  const id = props.id;
  //const km_value = props.km_value;
  const driver_id = props.driver_id;
  const [values, setValues] = useState({
    pay_date: new Date().toLocaleDateString(),
    total_km: '',
    sub_amount: '0',
    amount: '',
    other_charger: '0',
    current_loaction: '',
    location_id: '',
    payment_status: '',
    pay_by: '',
    status: 'Finished',
    driver_id : ''
  })

  useEffect(() => {
    setValues({ ...values, driver_id: driver_id })
  }, [driver_id])

  const [locationOptions, setLocationOptions] = useState([]);
  const locationhandleInputChange = (event, value) => {
    axios.get(`${API_BASE_URL}/location/location_autocomplete?search=${value}`)
      .then((result) => {
        if (result.data.Status) {
          setLocationOptions(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const getLocationOptionLabel = (option) => {
    if (option && typeof option === 'object' && option.name) {
      return option.name; // Return the "firstname" property as a string
    }
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
   axios.get(`${API_BASE_URL}/verify`)
     .then(result => {
       if (result.data.Status) {
        setValues(prevValues => ({ ...prevValues, pay_by: result.data.id }));
       }
     }).catch(err => console.log(err))
     locationhandleInputChange();
 }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (values.pay_date === '' || values.total_km === '' || values.amount === '' || values.sub_amount === '' || values.other_charger === '' || values.location_id === '' || values.current_loaction === '' || values.payment_status === '' || values.pay_by === '') {
      withReactContent(Swal)
        .fire({
          title: 'Please enter a required field.'
        });
    } else {
      axios.put(`${API_BASE_URL}/booking/pay_booking/`+ id, { values })
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

  // useEffect(() => {
  //   let amount_per_km = km_value;
  //   let total_km = values.total_km;
  //   let sub_amount_val = total_km * amount_per_km;
  //   setValues(prevValues => ({ ...prevValues, sub_amount: sub_amount_val }));

  //   let other_charger_val = values.other_charger;
  //   let amount_val = Number(sub_amount_val) + Number(other_charger_val);
  //   setValues(prevValues => ({ ...prevValues, amount: amount_val }));

  // }, [values.total_km])

  // useEffect(() => {
  //   let sub_amount_val = values.sub_amount;
  //   let other_charger_val = values.other_charger;
  //   let amount_val = Number(sub_amount_val) + Number(other_charger_val);
  //   setValues(prevValues => ({ ...prevValues, amount: amount_val }));
  // }, [values.other_charger])

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
              <FormControl className="w-75">
                <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select" 
                 value={values.payment_status}
                 onChange={(e) => setValues({ ...values, payment_status: e.target.value })}
                >
                  <MenuItem value={'Paid'}>Paid</MenuItem>
                  <MenuItem value={'Unpaid'}>Unpaid</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center mb-2">
              <FormControl variant="outlined" className="w-75">
                <InputLabel htmlFor="outlined-adornment-Kms">Running Kms</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-Kms"
                  endAdornment={<InputAdornment position="end">Kms</InputAdornment>}
                  label="Running Kms"
                  type='number'
                  value={values.total_km}
                  onChange={(e) => setValues({ ...values, total_km: e.target.value })}
                />
              </FormControl>
            </div>
            {/* <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-2">
              <TextField id="outlined-basic" label="Sub Amount" variant="outlined" className="w-75" 
                value={values.sub_amount}
                type='number'
                onChange={(e) => setValues({ ...values, sub_amount: e.target.value })}
              />
            </div> */}
            {/* <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-2">
              <TextField id="outlined-basic" label="Other Charges" variant="outlined" className="w-75" 
                value={values.other_charger}
                type='number'
                onChange={(e) => setValues({ ...values, other_charger: e.target.value })}
              />
            </div> */}
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-2">
              <TextField id="outlined-basic" label="Total Amount" variant="outlined" className="w-75" 
                value={values.amount}
                type='number'
                onChange={(e) => setValues({ ...values, amount: e.target.value })}
              />
            </div>
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-2">
              <Autocomplete
                disablePortal
                options={locationOptions}
                getOptionLabel={getLocationOptionLabel}
                className="w-75"
                onChange={(event, newValue) => {
                  setValues({ ...values, location_id: newValue.id })
                }}
                onInputChange={locationhandleInputChange}
                renderInput={(params) => (
                  <TextField {...params} label="Location" variant="outlined" />
                )}
              />
            </div>
            <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center my-2">
              <TextField id="outlined-basic" label="Location Point" variant="outlined" className="w-75" 
                value={values.current_loaction}
                onChange={(e) => setValues({ ...values, current_loaction: e.target.value })}
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

export default RunningCarsPopup;
