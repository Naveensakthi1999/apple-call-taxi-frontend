import '../../assets/scss/mystyle.css';
import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import { useState, useEffect} from 'react';

// ==============================|| Profile Update Function ||============================== //

function ProfileUpdate() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [values, setValues] = useState({
    username: '',
    gst_no: '',
    password: '',
    email: '',
    address: '',
    mobile: '',
    office_mobile: ''
   })
   const [errors, setErrors] = useState({});

   axios.defaults.withCredentials = true;
   useEffect(()=> {
    axios.get(`${API_BASE_URL}/setting/edit_profile`)
    .then(result => {
        setValues({
            ...values,
            username: result.data.Result[0].username,
            password: result.data.Result[0].password,
            email: result.data.Result[0].email,
            gst_no: result.data.Result[1].username,
            address: result.data.Result[1].email,
            mobile: result.data.Result[1].password,
            office_mobile: result.data.Result[1].office_mobile,
        })
    }).catch(err => console.log(err))
}, [])
  
   const handleSubmit = (e) => {
       e.preventDefault()

      const formErrors = validateForm(values);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
       axios.put(`${API_BASE_URL}/setting/update_profile`, {values})
       .then(result => {
           if(result.data.Status) {
              window.location.reload();
           } else {
              withReactContent(Swal)
              .fire({
                title: result.data.Error
              });
           }
       })
       .catch(err => console.log(err))
   }

   const handleReset = (e) => {
    e.preventDefault();
    window.location.reload();
   }

   const validateForm = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = true;
    }
    if (!values.password) {
      errors.password = true;
    }
    const isValidEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!values.email || !values.email.match(isValidEmail)) {
      errors.email = true;
    } 
    
    return errors;
  };

  return (
    <MainCard title="Settings Update">
      <form onSubmit={handleSubmit}>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-multiline-flexible" label="User Name" variant="outlined" type="text" className="w-75"
              value={values.username} 
              onChange={(e) => setValues({...values, username : e.target.value})}
              error={errors.username}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="GST Number" variant="outlined" className="w-75"
              value={values.gst_no} 
              onChange={(e) => setValues({...values, gst_no : e.target.value})}
            />
          </div>
        </div>
        <div className="row mt-3 mb-3"> 
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-multiline-static" rows={4} label="Company Address" variant="outlined" className="w-75" multiline 
              value={values.address}
              onChange={(e) => setValues({ ...values, address: e.target.value })}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Email Id" type='email' variant="outlined" className="w-75" 
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            error={errors.email}
            />
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Phone Number" type='number' variant="outlined" className="w-75" 
              value={values.mobile}
              onChange={(e) => setValues({ ...values, mobile: e.target.value })}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
           <FormControl variant="outlined" className="w-75">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={errors.password}
              />
            </FormControl>
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Office Number" type='number' variant="outlined" className="w-75" 
              value={values.office_mobile}
              onChange={(e) => setValues({ ...values, office_mobile: e.target.value })}
            />
          </div> 
        </div>
        <div className="d-flex my-5 justify-content-center">
          <button type="submit" className="btn mx-1" style={{ backgroundColor: '#5E35B1', color: 'white' }}>
            Submit
          </button>
          <button type="button" className="btn btn-secondary mx-1" onClick={handleReset}>
            Cancel
          </button>
        </div>
      </form>
    </MainCard>
  );
}

export default ProfileUpdate;
