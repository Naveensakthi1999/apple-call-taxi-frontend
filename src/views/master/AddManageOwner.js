import '../../assets/scss/mystyle.css';
import * as React from 'react';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
// ==============================|| ManagerOwner Function ||============================== //

function AddManageOwner() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    adl_mobile: '',
    address: '',
    pincode: '',
    date: new Date().toLocaleDateString(),
    created_by: ''
   })
  const [errors, setErrors] = useState({});

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

    const formErrors = validateForm(values);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
     axios.post(`${API_BASE_URL}/manageowner/add_manageowner`, {values})
     .then(result => {
         if(result.data.Status) {
             navigate('/master/ManageOwner')
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
  if (!values.lastname) {
    errors.lastname = true;
  }
  const isValidEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!values.email || !values.email.match(isValidEmail)) {
    errors.email = true;
  } 
  if (!values.address) {
    errors.address = true;
  }
  if (!values.pincode || values.pincode.length!==6) {
    errors.pincode = true;
  }
  if (!values.mobile || values.mobile.length!==10) {
    errors.mobile = true;
  }
  if (!values.date) {
    errors.date = true;
  }
  return errors;
};

  return (
    <MainCard
      title="Add Manage Owner"
      secondary={
        <Link to="/master/ManageOwner">
          <Button variant="contained"   color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Manage Owner List
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
          <div className="col-6 col-sm-12 col-lg-6">
            <TextField id="outlined-basic" label="Last Name" variant="outlined" className="w-75" 
            value={values.lastname} 
            onChange={(e) => setValues({...values, lastname : e.target.value})}
            error={errors.lastname}
            />
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
          <TextField id="outlined-basic" label="Email" type='text' variant="outlined" className="w-75"
          value={values.email}  
          onChange={(e) => setValues({...values, email : e.target.value})}
          error={errors.email}
          />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
          <TextField id="outlined-basic" label="Mobile" type='number' variant="outlined" className="w-75" 
          value={values.mobile} 
          onChange={(e) => setValues({...values, mobile : e.target.value})}
          error={errors.mobile}
          />
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
            <TextField id="outlined-multiline-flexible" label="Additional Mobile" variant="outlined" type="number" className="w-75" 
                value={values.adl_mobile}
                onChange={(e) => setValues({ ...values, adl_mobile: e.target.value })}
              />
          </div>
        </div>

        <div className="row  mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" className="w-75" 
               value={dayjs(values.date)}
               format="DD/MM/YYYY"
               onChange={(dateValue) => setValues({...values, date : new Date(dateValue).toLocaleDateString()})}
               error={errors.date}
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
          <TextField id="outlined-basic" label="Pincode" type='number' variant="outlined" className="w-75" 
          value={values.pincode} 
          onChange={(e) => setValues({...values, pincode : e.target.value})}
          error={errors.pincode}
          />
          </div>
        </div>
        
          {/* SUBMIT AND CANCEL */}
        <div className="d-flex my-5  justify-content-center">
          <button type="submit" className="btn mx-1" style={{backgroundColor :"#5E35B1",color:"white"}}>
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

export default AddManageOwner;
