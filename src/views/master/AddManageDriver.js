import '../../assets/scss/mystyle.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
// ==============================|| ManagerOwner Function ||============================== //


function AddManageDriver() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
    address: '',
    pincode: '',
    owner_id: '',
    proof: 'NULL',
    addhar_no: '111111111111',
    driving_licence_no: 'NULL',
    addharfrontside_image: '',
    addharbackside_image: '',
    drivingfrontside_image: '',
    drivingbackside_image: '',
    email : '',
    password : '',
    created_by: ''
   })
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);

  const handleInputChange = (event, value) => {
    axios.get(`${API_BASE_URL}/manageowner/manageowner_autocomplete?search=${value}`)
      .then((result) => {
        if (result.data.Status) {
          setOptions(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const getOptionLabel = (option) => {
    if (option && typeof option === 'object' && option.firstname) {
      return option.firstname; // Return the "firstname" property as a string
    }
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/verify`)
      .then(result => {
        if (result.data.Status) {
          setValues({...values, created_by : result.data.id});
        }
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('mobile', values.mobile);
    formData.append('address', values.address);
    formData.append('pincode', values.pincode);
    formData.append('owner_id', values.owner_id);
    formData.append('proof', values.proof);
    formData.append('addhar_no', values.addhar_no);
    formData.append('driving_licence_no', values.driving_licence_no);
    formData.append('addharfrontside_image', values.addharfrontside_image);
    formData.append('addharbackside_image', values.addharbackside_image);
    formData.append('drivingfrontside_image', values.drivingfrontside_image);
    formData.append('drivingbackside_image', values.drivingbackside_image);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('created_by', values.created_by);

    const formErrors = validateForm(values);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios.post(`${API_BASE_URL}/managedriver/add_managedriver`, formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/master/ManageDriver')
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
  if (!values.firstname) {
    errors.firstname = true;
  }
  if (!values.proof) {
    errors.proof = true;
  }
  if (!values.lastname) {
    errors.lastname = true;
  } 
  if (!values.addhar_no || values.addhar_no.length!==12) {
    errors.addhar_no = true;
  }
  if (!values.mobile || values.mobile.length!==10) {
    errors.mobile = true;
  }
  if (!values.addharfrontside_image) {
    errors.addharfrontside_image = true;
  }
  if (!values.address) {
    errors.address = true;
  } 
  if (!values.addharbackside_image) {
    errors.addharbackside_image = true;
  }
  if (!values.pincode) {
    errors.pincode = true;
  }
  if (!values.driving_licence_no) {
    errors.driving_licence_no = true;
  }
  if (!values.owner_id) {
    errors.owner_id = true;
  }
  if (!values.drivingfrontside_image) {
    errors.drivingfrontside_image = true;
  }
  if (!values.drivingbackside_image) {
    errors.drivingbackside_image = true;
  }
  const isValidEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!values.email || !values.email.match(isValidEmail)) {
    errors.email = true;
  } 
  if (!values.password) {
    errors.password = true;
  }

  return errors;
};
console.log(errors)
  return (
    <MainCard
      title="Add Manage Driver"
      secondary={
        <Link to="/master/ManageDriver">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Manage Driver List
          </Button>
        </Link>
      }
    >
      {/* INPUT FILED */}
      <form onSubmit={handleSubmit}>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="First Name" variant="outlined" className="w-75"
              value={values.firstname} 
              onChange={(e) => setValues({...values, firstname : e.target.value})}
              error={errors.firstname}
            />
          </div>
          {/* <div className="col-6 col-sm-12 col-lg-6">
            <TextField id="outlined-basic" label="Proof" variant="outlined" className="w-75"
             value={values.proof} 
             onChange={(e) => setValues({...values, proof : e.target.value})}
             error={errors.proof}
            />
          </div> */}
          <div className="col-6 col-sm-12 col-lg-6">
          <TextField id="outlined-basic" label="Email" variant="outlined" className="w-75"
              value={values.email} 
              onChange={(e) => setValues({...values, email : e.target.value})}
              error={errors.email}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Last Name" variant="outlined" className="w-75" 
              value={values.lastname} 
              onChange={(e) => setValues({...values, lastname : e.target.value})}
              error={errors.lastname}
            />
          </div>
          {/* <div className="col-6 col-sm-12 col-lg-6">
            <TextField id="outlined-basic" label="Addhar No" variant="outlined" type="number" className="w-75" 
              value={values.addhar_no} 
              onChange={(e) => setValues({...values, addhar_no : e.target.value})}
              error={errors.addhar_no}
            />
          </div> */}
          <div className="col-6 col-sm-12 col-lg-6">
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
            <TextField id="outlined-multiline-flexible" label="Mobile" variant="outlined" type="number" className="w-75" 
             value={values.mobile} 
             onChange={(e) => setValues({...values, mobile : e.target.value})}
             error={errors.mobile}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <div className="custom-file w-75 mb-3">
              <TextField type="file" className="custom-file-input Addharfrontside"  name="addharfrontside_image"
              onChange={(e) =>  
                setValues({...values, addharfrontside_image: e.target.files[0]})
              }
              />
              <label className="custom-file-label Addharfrontside-label"
              style={errors.addharfrontside_image ? {border: "1px solid red", color: "red"} : {}} >
               {values.addharfrontside_image ? values.addharfrontside_image.name : 'Addhar Front Side' }
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-multiline-flexible" label="Address" multiline maxRows={4} className="w-75"
               value={values.address} 
               onChange={(e) => setValues({...values, address : e.target.value})}
               error={errors.address}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <div className="custom-file w-75 mb-3">
              <TextField type="file" className="custom-file-input Addharbackside"  name="addharbackside_image" 
              onChange={(e) =>  
                setValues({...values, addharbackside_image: e.target.files[0]})
              }
              />
              <label className="custom-file-label Addharbackside-label" 
              style={errors.addharbackside_image ? {border: "1px solid red", color: "red"} : {}} >
                {values.addharbackside_image ? values.addharbackside_image.name : 'Addhar Back Side' }
              </label>
            </div>
          </div>
        </div>

        <div className="row  mt-3 mb-3 ">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Pincode" variant="outlined" type="number" className="w-75"
              value={values.pincode} 
              onChange={(e) => setValues({...values, pincode : e.target.value})}
              error={errors.pincode}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
          {/* <TextField id="outlined-basic" label="Driving Licence No" variant="outlined" className="w-75" 
             value={values.driving_licence_no} 
             onChange={(e) => setValues({...values, driving_licence_no : e.target.value})}
             error={errors.driving_licence_no}
          /> */}
            <div className="custom-file w-75 ">
              <TextField
                type="file"
                className="custom-file-input Drivingfrontside "
                name="drivingfrontside_image"
                onChange={(e) =>  
                  setValues({...values, drivingfrontside_image: e.target.files[0]})
                }
              />
              <label className="custom-file-label Drivingfrontside-label"
              style={errors.drivingfrontside_image ? {border: "1px solid red", color: "red"} : {}} >
                {values.drivingfrontside_image ? values.drivingfrontside_image.name : 'Driving Licence Front Side' }
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <Autocomplete
              freeSolo
              options={options}
              getOptionLabel={getOptionLabel}
              onChange={(event, newValue) => {
                setValues({...values, owner_id : newValue.id})
              }}
              className="w-75" 
              onInputChange={handleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Owner Name" error={Boolean(errors.owner_id)} variant="outlined" />
              )}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <div className="custom-file w-75 mb-3">
              <TextField type="file" className="custom-file-input Drivingbackside" name="drivingbackside_image" 
              onChange={(e) =>  
                setValues({...values, drivingbackside_image: e.target.files[0]})
              }
              />
              <label className="custom-file-label Drivingbackside-label" 
              style={errors.drivingbackside_image ? {border: "1px solid red", color: "red"} : {}}>
                {values.drivingbackside_image ? values.drivingbackside_image.name : 'Driving Licence Back Side' }
              </label>
            </div>
          </div>
        </div>


        {/* SUBMIT AND CANCEL */}
        <div className="d-flex my-5  justify-content-center">
          <button type="submit" className="btn mx-1" style={{ backgroundColor: '#5E35B1', color: 'white' }}>
            Submit
          </button>
          <button type="button" className="btn btn-secondary mx-1" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </MainCard>
  );
}

export default AddManageDriver;
