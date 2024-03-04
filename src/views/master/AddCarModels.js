import '../../assets/scss/mystyle.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button, TextField } from '@mui/material';
import { useState, useEffect} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
// ==============================|| ManagerOwner Function ||============================== //

function AddCarModels() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    carname: '',
    available_seats: '',
    min_trip_amount: '',
    min_service_charge: '',
    max_service_charge: '',
    fixed_amount: '',
    per_kms: '0',
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
       axios.post(`${API_BASE_URL}/carmodels/add_carmodels`, {values})
       .then(result => {
           if(result.data.Status) {
               navigate('/master/CarModels')
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
    if (!values.carname) {
      errors.carname = true;
    }
    if (!values.available_seats) {
      errors.available_seats = true;
    }
    if (!values.min_trip_amount) {
      errors.min_trip_amount = true;
    } 
    if (!values.min_service_charge) {
      errors.min_service_charge = true;
    }
    if (!values.max_service_charge) {
      errors.max_service_charge = true;
    }
    if (!values.fixed_amount) {
      errors.fixed_amount = true;
    }
    if (!values.per_kms) {
      errors.per_kms = true;
    } 
    return errors;
  };

  return (
    <MainCard
      title="Add Car Models"
      secondary={
        <Link to="/master/CarModels">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Manage Cars List
          </Button>
        </Link>
      }
    >
      {/* INPUT FILED */}
      <form onSubmit={handleSubmit}>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Car Name" variant="outlined" className="w-50" 
             value={values.carname} 
             onChange={(e) => setValues({...values, carname : e.target.value})}
             error={errors.carname}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <TextField id="outlined-basic" label="Available seats" variant="outlined" type='number' className="w-50" 
             value={values.available_seats} 
             onChange={(e) => setValues({...values, available_seats : e.target.value})}
             error={errors.available_seats}
            />
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Min Trip Amount" variant="outlined" type='number' className="w-50" 
             value={values.min_trip_amount} 
             onChange={(e) => setValues({...values, min_trip_amount : e.target.value})}
             error={errors.min_trip_amount}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <FormControl variant="outlined" className="w-50">
              <InputLabel htmlFor="outlined-adornment-MinSeriveCharge">Min Service Charge</InputLabel>
              <OutlinedInput
                id="outlined-adornment-MinSeriveCharge"
                endAdornment={
                  <InputAdornment  position="end">
                    %
                  </InputAdornment>
                }
                label="Min Service Charge"
                type='number'
                value={values.min_service_charge} 
                onChange={(e) => setValues({...values, min_service_charge : e.target.value})}
                error={errors.min_service_charge}
              />
            </FormControl>
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <FormControl variant="outlined" className="w-50">
              <InputLabel htmlFor="outlined-adornment-MinSeriveCharge">Max Service Charge</InputLabel>
              <OutlinedInput
                id="outlined-adornment-MinSeriveCharge"
                endAdornment={
                  <InputAdornment position="end">
                    %
                  </InputAdornment>
                }
                label="Max Service Charge"
                type='number'
                value={values.max_service_charge} 
                onChange={(e) => setValues({...values, max_service_charge : e.target.value})}
                error={errors.max_service_charge}
              />
            </FormControl>
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <TextField id="outlined-basic" label="Fixed Amount" variant="outlined" type='number' className="w-50" 
              value={values.fixed_amount} 
              onChange={(e) => setValues({...values, fixed_amount : e.target.value})}
              error={errors.fixed_amount}
            />
          </div>
        </div>
        {/* <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <TextField id="outlined-basic" label="Price (Per Kms)" variant="outlined" type='number' className="w-50" 
              value={values.per_kms} 
              onChange={(e) => setValues({...values, per_kms : e.target.value})}
              error={errors.per_kms}
            />
          </div>
        </div> */}

        {/* SUBMIT AND CANCEL */}
        <div className="d-flex my-5  justify-content-center">
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

export default AddCarModels;
