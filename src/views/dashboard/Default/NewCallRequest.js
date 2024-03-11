import '../../../assets/scss/mystyle.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/config';
//import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'; 
// ==============================|| ManagerOwner Function ||============================== //

function NewCallRequest({ noneheading }) {
  //const navigate = useNavigate();
  const [values, setValues] = useState({
    booking_id: '',
    mobile: '',
    cust_name: '',
    cust_id: '',
    adl_mobile: '',
    from_loaction: '',
    to_loaction: '',
    land_mark: '',
    pickup_date: new Date().toLocaleDateString(),
    pickup_time: new Date(),
    car_id: '',
    no_seats: '',
    driver_id: '',
    created_by: ''
  })
  const [errors, setErrors] = useState({});
  const [customerOptions, setCustomerOptions] = useState([]);
  const customerhandleInputChange = (event, value) => {
    setValues({ ...values, mobile: value })
    axios.get(`${API_BASE_URL}/customer/customer_autocomplete?search=${value}`)
      .then((result) => {
        if (result.data.Status) {
          setCustomerOptions(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const getCustomerOptionLabel = (option) => {
    if (option && typeof option === 'object' && option.result) {
      return option.result; // Return the "firstname" property as a string
    }
  };

  const [driverOptions, setDriverOptions] = useState([]);
  const driverhandleInputChange = (event, value) => {
    axios.get(`${API_BASE_URL}/managedriver/managedriver_booking_autocomplete?search=${value}&car_id=${values.car_id}`)
      .then((result) => {
        if (result.data.Status) {
          setDriverOptions(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const getDriverOptionLabel = (option) => {
    if (option && typeof option === 'object' && option.firstname) {
      //return option.firstname +' - T : '+ option.booking_count_today+' - M : '+ option.booking_count_this_month+' - RS : '+ option.total_amount_this_month;
      return option.firstname;
    }
  };

  const [carOptions, setCarOptions] = useState([]);
  const carhandleInputChange = (event, value) => {
    axios.get(`${API_BASE_URL}/carmodels/carmodels_autocomplete?search=${value}`)
      .then((result) => {
        if (result.data.Status) {
          setCarOptions(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const getCarOptionLabel = (option) => {
    if (option && typeof option === 'object' && option.carname) {
      return option.carname; // Return the "firstname" property as a string
    }
  };

  const findCarSeats = (id) => {
    axios.get(`${API_BASE_URL}/carmodels/edit_carmodels/`+id)
    .then(result => {
        setValues({
            ...values,
            no_seats: result.data.Result[0].available_seats,
            car_id: result.data.Result[0].id,
        })
    }).catch(err => console.log(err))
  }

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/verify`)
      .then(result => {
        if (result.data.Status) {
          setValues(prevValues => ({ ...prevValues, created_by: result.data.id }));
        }
      }).catch(err => console.log(err))

    axios.get(`${API_BASE_URL}/booking/booking_id_count`)
    .then(result => {
      if (result.data.Status) {
        let booking_id_val = result.data.Result[0].count;
        booking_id_val += 1;
        setValues(prevValues => ({ ...prevValues, booking_id: String(booking_id_val).padStart(6,"0") }));
      }
    }).catch(err => console.log(err))

    carhandleInputChange();
  }, [])

  useEffect(()=>{
    driverhandleInputChange();
  }, [values.car_id])

  const findCustomerName = (mobile) => {
    axios.get(`${API_BASE_URL}/customer/customer_mobile/`+mobile)
    .then(result => {
        setValues({
            ...values,
            cust_name: result.data.Result[0].name,
            cust_id: result.data.Result[0].id,
            mobile: mobile,
        })
    }).catch(err => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formErrors = validateForm(values);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios.post(`${API_BASE_URL}/booking/add_booking`, {values})
    .then(result => {
        if(result.data.Status) {
            //navigate('/Booking/ManageBooking')
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
  if (!values.mobile || values.mobile.length!==10) {
    errors.mobile = true;
  }
  if (!values.cust_name) {
    errors.cust_name = true;
  }
  if (!values.from_loaction) {
    errors.from_loaction = true;
  } 
  if (!values.to_loaction) {
    errors.to_loaction = true;
  }
  if (!values.land_mark) {
    errors.land_mark = true;
  }
  if (!values.pickup_date) {
    errors.pickup_date = true;
  }
  if (!values.pickup_time) {
    errors.pickup_time = true;
  } 
  if (!values.car_id) {
    errors.car_id = true;
  } 
  if (!values.no_seats) {
    errors.no_seats = true;
  } 
  if (!values.driver_id) {
    errors.driver_id = true;
  } 
  return errors;
};
useEffect(() => {
  axios.get(`${API_BASE_URL}/availablestatus/availablecar_status`)
  .then((result) => {
    if (result.data.Status) {
      console.log("Available Status Successfully");
    } else {
      alert(result.data.Error);
    }
  })
  .catch((err) => console.log(err));
}, []);

console.log(values.pickup_time);

return (
    <MainCard title={noneheading}>
      {/* INPUT FILED */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-end mt-2 mb-2">
            <Autocomplete
              freeSolo
              options={customerOptions}
              getOptionLabel={getCustomerOptionLabel}
              onChange={(event, newValue) => {
                findCustomerName(newValue.result);
              }}
              className="w-100"
              onInputChange={customerhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Mobile" type='text'
                error={Boolean(errors.mobile)} 
                variant="outlined" />
              )}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-end mt-2 mb-2">
            <TextField id="outlined-basic" label="Customer Name" variant="outlined" className="w-100" 
               value={values.cust_name}
               onChange={(e) => setValues({ ...values, cust_name: e.target.value })}
               error={errors.cust_name}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-end mt-2 mb-2">
            <TextField id="outlined-multiline-flexible" label="Additional Mobile" variant="outlined" type="number" className="w-100" 
              value={values.adl_mobile}
              onChange={(e) => setValues({ ...values, adl_mobile: e.target.value })}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <TextField id="outlined-basic" label="From Location" variant="outlined" className="w-100" 
              value={values.from_loaction}
              onChange={(e) => setValues({ ...values, from_loaction: e.target.value })}
              error={errors.from_loaction}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <TextField id="outlined-basic" label="Land Mark" variant="outlined" className="w-100" 
              value={values.land_mark}
              onChange={(e) => setValues({ ...values, land_mark: e.target.value })}
              error={errors.land_mark}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <TextField id="outlined-basic" label="To Location" variant="outlined" className="w-100" 
              value={values.to_loaction}
              onChange={(e) => setValues({ ...values, to_loaction: e.target.value })}
              error={errors.to_loaction}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-end mt-2 mb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" className="w-100"
                value={dayjs(values.pickup_date)}
                format="DD/MM/YYYY"
                onChange={(dateValue) => setValues({ ...values, pickup_date: new Date(dateValue).toLocaleDateString() })}
                error={errors.pickup_date}
              />
            </LocalizationProvider>
          </div>
          <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-end mt-2 mb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Pickup Time" className="w-100" 
                value={dayjs(values.pickup_time)}
                onChange={(timeValue) => setValues({ ...values, pickup_time: new Date(timeValue)})}
                error={errors.pickup_time}
              />
            </LocalizationProvider>
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <Autocomplete
              disablePortal
              options={carOptions}
              getOptionLabel={getCarOptionLabel}
              onChange={(event, newValue) => {
                findCarSeats(newValue.id)
              }}
              className="w-100 "
              onInputChange={carhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Car Name" error={Boolean(errors.car_id)}  variant="outlined" />
              )}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <TextField id="outlined-multiline-flexible" label="Seats" className="w-100" type="number" 
               value={values.no_seats}
               onChange={(e) => setValues({ ...values, no_seats: e.target.value })}
               error={errors.no_seats}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <Autocomplete
              disablePortal
              options={driverOptions}
              getOptionLabel={getDriverOptionLabel}
              onChange={(event, newValue) => {
                setValues({ ...values, driver_id: newValue.id })
              }}
              className="w-100 "
              onInputChange={driverhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Driver Name" variant="outlined" error={Boolean(errors.driver_id)} />
              )}
              readOnly={!values.car_id}
            />
          </div>
        </div>

        {/* SUBMIT CANCEL */}
        <div className="d-flex my-3 justify-content-center">
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

export default NewCallRequest;
