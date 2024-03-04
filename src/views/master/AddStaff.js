import '../../assets/scss/mystyle.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
// ==============================|| ManagerOwner Function ||============================== //

function AddStaff() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    date: new Date().toLocaleDateString(),
    address: '',
    name: '',
    city: '',
    email: '',
    pincode: '',
    mobile: '',
    staff_image: '',
    birth_date: new Date().toLocaleDateString(),
    username: '',
    gender: '',
    password: '',
    created_by: ''
  })
  const [errors, setErrors] = useState({});
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/verify`)
      .then(result => {
        if (result.data.Status) {
          setValues({ ...values, created_by: result.data.id });
        }
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('date', values.date);
    formData.append('address', values.address);
    formData.append('name', values.name);
    formData.append('city', values.city);
    formData.append('email', values.email);
    formData.append('pincode', values.pincode);
    formData.append('mobile', values.mobile);
    formData.append('staff_image', values.staff_image);
    formData.append('birth_date', values.birth_date);
    formData.append('username', values.username);
    formData.append('gender', values.gender);
    formData.append('password', values.password);
    formData.append('created_by', values.created_by);

    const formErrors = validateForm(values);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios.post(`${API_BASE_URL}/staff/add_staff`, formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/master/StaffProfile')
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
    if (!values.date) {
      errors.date = true;
    }
    if (!values.address) {
      errors.address = true;
    }
    if (!values.name) {
      errors.name = true;
    } 
    if (!values.city) {
      errors.city = true;
    }
    const isValidEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!values.email || !values.email.match(isValidEmail)) {
      errors.email = true;
    } 
    if (!values.pincode || values.pincode.length!==6) {
      errors.pincode = true;
    }
    if (!values.mobile || values.mobile.length!==10) {
      errors.mobile = true;
    }
    if (!values.staff_image) {
      errors.staff_image = true;
    }
    if (!values.birth_date) {
      errors.birth_date = true;
    }
    if (!values.username) {
      errors.username = true;
    }
    if (!values.gender) {
      errors.gender = true;
    }
    if (!values.password) {
      errors.password = true;
    }
    
    return errors;
  };

  return (
    <MainCard
      title="Add Staff Profile"
      secondary={
        <Link to="/master/StaffProfile">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Staff Profile List
          </Button>
        </Link>
      }
    >
      {/* INPUT FILED */}
      <form onSubmit={handleSubmit}>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" className="w-75"
                value={dayjs(values.date)}
                format="DD/MM/YYYY"
                onChange={(dateValue) => setValues({ ...values, date: new Date(dateValue).toLocaleDateString() })}
                error={errors.date}
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 col-sm-12 col-lg-6 ">
            <TextField id="outlined-multiline-flexible" label="Address" multiline className="w-75" maxRows={4} 
               value={values.address}
               onChange={(e) => setValues({ ...values, address: e.target.value })}
               error={errors.address}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Staff Name" variant="outlined" className="w-75" 
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              error={errors.name}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6 ">
            <TextField id="outlined-basic" label="City" variant="outlined" className="w-75" 
              value={values.city}
              onChange={(e) => setValues({ ...values, city: e.target.value })}
              error={errors.city}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Email" variant="outlined" className="w-75" 
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              error={errors.email}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6 ">
          <TextField id="outlined-basic" label="Pincode" type="number" className="w-75"
            value={values.pincode}
            onChange={(e) => setValues({ ...values, pincode: e.target.value })}
            error={errors.pincode}
          />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-multiline-flexible" label="Mobile" variant="outlined" type="number" className="w-75" 
              value={values.mobile}
              onChange={(e) => setValues({ ...values, mobile: e.target.value })}
              error={errors.mobile}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6 ">
             <div className="custom-file w-75">
              <input type="file" className="custom-file-input StaffPhoto" id="customFile" name="filename"
                onChange={(e) =>
                  setValues({ ...values, staff_image: e.target.files[0] })
                }
              />
              <label className="custom-file-label StaffPhoto-label"
               style={errors.staff_image ? {border: "1px solid red", color: "red"} : {}}
              htmlFor="customFile">
                Staff Photo
                {values.staff_image ? values.staff_image.name : 'Staff Photo'}
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date of Birth" className="w-75"
                value={dayjs(values.birth_date)}
                format="DD/MM/YYYY"
                onChange={(dateValue) => setValues({ ...values, birth_date: new Date(dateValue).toLocaleDateString() })}
                error={errors.birth_date}
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 col-sm-12 col-lg-6 ">
            <TextField id="outlined-basic" label="UserName" variant="outlined" className="w-75" 
              value={values.username}
              onChange={(e) => setValues({ ...values, username: e.target.value })}
              error={errors.username}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <FormControl className="w-75">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Gender"
                value={values.gender}
                onChange={(e) => setValues({ ...values, gender: e.target.value })}
                error={errors.gender}
              >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-6 col-sm-12 col-lg-6 ">
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

        {/* SUBMIT AND CANCEL */}
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

export default AddStaff;
