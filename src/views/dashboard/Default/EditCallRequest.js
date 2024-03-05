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
import { useNavigate,useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'; 
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
// ==============================|| ManagerOwner Function ||============================== //

function EditCallRequest({ noneheading }) {
  const {id} = useParams();
  const navigate = useNavigate();
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
    pickup_time: new Date().toLocaleDateString(),
    car_id: '',
    no_seats: '',
    driver_id: '',
    edit_by: '',
    pay_date: new Date().toLocaleDateString(),
    total_km: '',
    sub_amount: '0',
    amount: '',
    other_charger: '0',
    current_loaction: '',
    location_id: '',
    payment_status: '',
    pay_by: '',
    status: '',
  })

  const [pickupTimeNormal, setPickupTimeNormal] = useState('');

  const [customerOptions, setCustomerOptions] = useState([]);
  const [customerOptionsValue, setCustomerOptionsValue] = useState('');
  const customerhandleInputChange = (event, value) => {
    setCustomerOptionsValue(value);
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
  const [driverOptionsValue, setDriverOptionsValue] = useState('');
  const driverhandleInputChange = (event, value) => {
    setDriverOptionsValue(value);
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
      // return option.firstname +' - T : '+ option.booking_count_today+' - M : '+ option.booking_count_this_month+' - RS : '+ option.total_amount_this_month; // Return the "firstname" property as a string
      return option.firstname;
    }
  };

  const [carOptions, setCarOptions] = useState([]);
  const [carOptionsValue, setCarOptionsValue] = useState('');
  const carhandleInputChange = (event, value) => {
    setCarOptionsValue(value);
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

  const [locationOptions, setLocationOptions] = useState([]);
  const [locationOptionsValue, setlLocationOptionsValue] = useState('');
  const locationhandleInputChange = (event, value) => {
    setlLocationOptionsValue(value);
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

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/booking/edit_booking/${id}`);
      const bookingData = result.data.Result[0];
      setValues((prevValues) => ({
        ...prevValues,
        booking_id: bookingData.booking_id,
        mobile: bookingData.mobile,
        cust_name: bookingData.cust_name,
        cust_id: bookingData.cust_id,
        adl_mobile: bookingData.adl_mobile,
        from_loaction: bookingData.from_loaction,
        to_loaction: bookingData.to_loaction,
        land_mark: bookingData.land_mark,
        pickup_date: new Date(bookingData.pickup_date).toLocaleDateString(),
        car_id: bookingData.car_id,
        no_seats: bookingData.no_seats,
        driver_id: bookingData.driver_id,
        total_km: bookingData.total_km,
        sub_amount: bookingData.sub_amount,
        amount: bookingData.amount,
        other_charger: bookingData.other_charger,
        current_loaction: bookingData.current_loaction,
        location_id: bookingData.location_id,
        payment_status: bookingData.payment_status,
        status: bookingData.status,
      }));
      setlLocationOptionsValue(bookingData.location_name);
      setCustomerOptionsValue(bookingData.mobile);
      setDriverOptionsValue(bookingData.driver_name);
      setCarOptionsValue(bookingData.car_name);
      setPickupTimeNormal(bookingData.pickup_time);
      const verifyResult = await axios.get(`${API_BASE_URL}/verify`);
      if (verifyResult.data.Status) {
        setValues((prevValues) => ({
          ...prevValues,
          edit_by: verifyResult.data.id,
          pay_by: verifyResult.data.id,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, [id]);

useEffect(()=>{
  // const twelveHourTime = pickupTimeNormal;
  // const [time, period] = twelveHourTime.split(' '); // Split the time and period (AM/PM)
  
  // let [hours, minutes] = time.split(':'); // Split hours and minutes
  // hours = parseInt(hours); // Convert hours to a number
  // if (period === 'PM' && hours !== 12) {
  //     hours += 12; // Convert to 24-hour format if PM and not 12 PM
  // } else if (period === 'AM' && hours === 12) {
  //     hours = 0; // Convert 12 AM to 0 hours
  // }
  
  // const date = new Date();
  // date.setHours(hours, parseInt(minutes), 0, 0); // Set hours and minutes
  setValues({ ...values, pickup_time: pickupTimeNormal});

}, [pickupTimeNormal])

const handleSubmit = (e) => {
  e.preventDefault()
  
  if (values.booking_id === '' || values.mobile === '' || values.cust_name === '' || values.from_loaction === ''|| values.to_loaction === ''|| values.land_mark === '' || values.pickup_date === '' || values.pickup_time === '' || values.car_id === '' || values.no_seats === '' || values.driver_id === '' || values.edit_by === '') {
    withReactContent(Swal)
    .fire({
      title: 'Please enter a required field.'
    });
  } else {
     console.log(values.pickup_time);
    axios.put(`${API_BASE_URL}/booking/update_booking/`+id, {values})
    .then(result => {
        if(result.data.Status) {
            navigate('/Booking/ManageBooking')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
   }
}

const handleReset = (e) => {
 e.preventDefault();
 navigate('/Booking/ManageBooking');
}
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
                <TextField {...params} label="Mobile" type='Number' variant="outlined" id="outlined-read-only-input"
                />
              )}
              inputValue={customerOptionsValue}
              readOnly
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-end mt-2 mb-2">
            <TextField id="outlined-read-only-input" label="Customer Name" variant="outlined" className="w-100" 
               value={values.cust_name}
               onChange={(e) => setValues({ ...values, cust_name: e.target.value })}
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
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <TextField id="outlined-basic" label="Land Mark" variant="outlined" className="w-100" 
              value={values.land_mark}
              onChange={(e) => setValues({ ...values, land_mark: e.target.value })}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <TextField id="outlined-basic" label="To Location" variant="outlined" className="w-100" 
              value={values.to_loaction}
              onChange={(e) => setValues({ ...values, to_loaction: e.target.value })}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-end mt-2 mb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" className="w-100"
                value={dayjs(values.pickup_date)}
                format="DD/MM/YYYY"
                onChange={(dateValue) => setValues({ ...values, pickup_date: new Date(dateValue).toLocaleDateString() })}
              />
            </LocalizationProvider>
          </div>
          <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-end mt-2 mb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Pickup Time" className="w-100" 
                value={dayjs(values.pickup_time)}
                onChange={(timeValue) => setValues({ ...values, pickup_time: new Date(timeValue)})}
              />
            </LocalizationProvider>
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <Autocomplete
              freeSolo
              options={carOptions}
              getOptionLabel={getCarOptionLabel}
              onChange={(event, newValue) => {
                findCarSeats(newValue.id)
              }}
              className="w-100 "
              onInputChange={carhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Car Name" variant="outlined" />
              )}
              inputValue={carOptionsValue}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <TextField id="outlined-multiline-flexible" label="Seats" className="w-100" type="number" 
               value={values.no_seats}
               onChange={(e) => setValues({ ...values, no_seats: e.target.value })}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <Autocomplete
              freeSolo
              options={driverOptions}
              getOptionLabel={getDriverOptionLabel}
              onChange={(event, newValue) => {
                setValues({ ...values, driver_id: newValue.id })
              }}
              className="w-100 "
              onInputChange={driverhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Driver Name" variant="outlined" />
              )}
              inputValue={driverOptionsValue}
            />
          </div>

          {/* Payment Details */}
          {values.status === 'Finished' ? (
          <>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <FormControl className="w-100">
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
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <FormControl variant="outlined" className="w-100">
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
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <TextField id="outlined-basic" label="Total Amount" variant="outlined" className="w-100" 
              value={values.amount}
              type='number'
              onChange={(e) => setValues({ ...values, amount: e.target.value })}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
            <Autocomplete
              freeSolo
              options={locationOptions}
              getOptionLabel={getLocationOptionLabel}
              className="w-100"
              onChange={(event, newValue) => {
                setValues({ ...values, location_id: newValue.id })
              }}
              onInputChange={locationhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Location" variant="outlined" />
              )}
              inputValue={locationOptionsValue}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-12 mt-2 mb-2">
              <TextField id="outlined-basic" label="Location Point" variant="outlined" className="w-100" 
                value={values.current_loaction}
                onChange={(e) => setValues({ ...values, current_loaction: e.target.value })}
              />
            </div>
          </>
          ) : '' }
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

export default EditCallRequest;
