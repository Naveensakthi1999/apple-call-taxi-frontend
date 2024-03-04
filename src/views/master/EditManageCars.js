import '../../assets/scss/mystyle.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
// ==============================|| ManagerOwner Function ||============================== //

function EditManageCars() {
  const { id } = useParams()
  const navigate = useNavigate();
  const [values, setValues] = useState({
    date: new Date().toLocaleDateString(),
    owner_id: '',
    driver_id: '',
    fc_date: new Date().toLocaleDateString(),
    insurance_date: new Date().toLocaleDateString(),
    tax_date: new Date().toLocaleDateString(),
    car_id: '',
    no_seats: '',
    car_no: '',
    ac_or_non_ac: 'AC',
    car_image: '',
    location: '',
    location_id: '',
    edit_by: '',
  })
  const [errors, setErrors] = useState({});
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

  const [ownerOptions, setOwnerOptions] = useState([]);
  const [ownerOptionsValue, setOwnerOptionsValue] = useState('');
  const ownerhandleInputChange = (event, value) => {
    setOwnerOptionsValue(value);
    axios.get(`${API_BASE_URL}/manageowner/manageowner_autocomplete?search=${value}`)
      .then((result) => {
        if (result.data.Status) {
          setOwnerOptions(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const getOwnerOptionLabel = (option) => {
    if (option && typeof option === 'object' && option.firstname) {
      return option.firstname; // Return the "firstname" property as a string
    }
  };

  const [driverOptions, setDriverOptions] = useState([]);
  const [driverOptionsValue, setDriverOptionsValue] = useState('');
  const driverhandleInputChange = (event, value) => {
    setDriverOptionsValue(value);
    axios.get(`${API_BASE_URL}/managedriver/managedriver_autocomplete?search=${value}`)
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
      return option.firstname; // Return the "firstname" property as a string
    }
  };

  const [locationOptions, setLocationOptions] = useState([]);
  const [locationOptionsValue, setLocationOptionsValue] = useState('');
  const locationhandleInputChange = (event, value) => {
    setLocationOptionsValue(value);
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

  const findCarSeats = (id) => {
    axios.get(`${API_BASE_URL}/carmodels/edit_carmodels/` + id)
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
    const fetchData = async () => {
      try {
        const result = await axios.get(`${API_BASE_URL}/managecar/edit_managecar/${id}`);
        const carData = result.data.Result[0];
        setValues((prevValues) => ({
          ...prevValues,
          date: new Date(carData.date).toLocaleDateString(),
          owner_id: carData.owner_id,
          driver_id: carData.driver_id,
          fc_date: new Date(carData.fc_date).toLocaleDateString(),
          insurance_date: new Date(carData.insurance_date).toLocaleDateString(),
          tax_date: new Date(carData.tax_date).toLocaleDateString(),
          car_id: carData.car_id,
          no_seats: carData.no_seats,
          car_no: carData.car_no,
          ac_or_non_ac: carData.ac_or_non_ac,
          location: carData.location,
          location_id: carData.location_id,
        }));
        setCarOptionsValue(carData.carname);
        setOwnerOptionsValue(carData.owner_name);
        setDriverOptionsValue(carData.driver_name);
        setLocationOptionsValue(carData.location_name);
        const verifyResult = await axios.get(`${API_BASE_URL}/verify`);
        if (verifyResult.data.Status) {
          setValues((prevValues) => ({
            ...prevValues,
            edit_by: verifyResult.data.id,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('date', values.date);
    formData.append('owner_id', values.owner_id);
    formData.append('driver_id', values.driver_id);
    formData.append('fc_date', values.fc_date);
    formData.append('insurance_date', values.insurance_date);
    formData.append('tax_date', values.tax_date);
    formData.append('car_id', values.car_id);
    formData.append('no_seats', values.no_seats);
    formData.append('car_no', values.car_no);
    formData.append('ac_or_non_ac', values.ac_or_non_ac);
    formData.append('car_image', values.car_image);
    formData.append('edit_by', values.edit_by);
    formData.append('location', values.location);
    formData.append('location_id', values.location_id);
    formData.append('created_by', values.created_by);

    const formErrors = validateForm(values);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios.put(`${API_BASE_URL}/managecar/update_managecar/` + id, formData)
      .then(result => {
        if (result.data.Status) {
          navigate('/master/ManageCars')
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
    navigate('/master/ManageCars');
  }

  const validateForm = (values) => {
    let errors = {};
    if (!values.date) {
      errors.date = true;
    }
    if (!values.car_id) {
      errors.car_id = true;
    }
    if (!values.owner_id) {
      errors.owner_id = true;
    }
    if (!values.no_seats) {
      errors.no_seats = true;
    }
    if (!values.driver_id) {
      errors.driver_id = true;
    }
    if (!values.car_no) {
      errors.car_no = true;
    }
    if (!values.fc_date) {
      errors.fc_date = true;
    }
    if (!values.ac_or_non_ac) {
      errors.ac_or_non_ac = true;
    }
    if (!values.insurance_date) {
      errors.insurance_date = true;
    }
    if (!values.tax_date) {
      errors.tax_date = true;
    }
    if (!values.location) {
      errors.location = true;
    }

    return errors;
  };

  return (
    <MainCard
      title="Add Manage Cars"
      secondary={
        <Link to="/master/ManageCars">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Manage Cars List
          </Button>
        </Link>
      }
    >
      {/* INPUT FILED */}
      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
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
          <div className="col-6 col-sm-12 col-lg-6">
            <Autocomplete
              freeSolo
              options={carOptions}
              getOptionLabel={getCarOptionLabel}
              onChange={(event, newValue) => {
                findCarSeats(newValue.id)
              }}
              className="w-75 "
              onInputChange={carhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Car Name" variant="outlined"
                  error={Boolean(errors.car_id)}
                />
              )}
              inputValue={carOptionsValue}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <Autocomplete
              freeSolo
              options={ownerOptions}
              getOptionLabel={getOwnerOptionLabel}
              onChange={(event, newValue) => {
                setValues({ ...values, owner_id: newValue.id })
              }}
              className="w-75 "
              onInputChange={ownerhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Owner Name" variant="outlined"
                  error={Boolean(errors.owner_id)}
                />
              )}
              inputValue={ownerOptionsValue}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <TextField id="outlined-basic" label="Available Seats" type="number" variant="outlined" className="w-75"
              value={values.no_seats}
              onChange={(e) => setValues({ ...values, no_seats: e.target.value })}
              error={errors.no_seats}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <Autocomplete
              freeSolo
              options={driverOptions}
              getOptionLabel={getDriverOptionLabel}
              onChange={(event, newValue) => {
                setValues({ ...values, driver_id: newValue.id })
              }}
              className="w-75 "
              onInputChange={driverhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Driver Name" variant="outlined"
                  error={Boolean(errors.driver_id)}
                />
              )}
              inputValue={driverOptionsValue}
            />
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <TextField id="outlined-multiline-flexible" label="Car No" variant="outlined" className="w-75"
              value={values.car_no}
              onChange={(e) => setValues({ ...values, car_no: e.target.value })}
              error={errors.car_no}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Fc Date" className="w-75"
                value={dayjs(values.fc_date)}
                format="DD/MM/YYYY"
                onChange={(dateValue) => setValues({ ...values, fc_date: new Date(dateValue).toLocaleDateString() })}
                error={errors.fc_date}
              />
            </LocalizationProvider>
          </div>
          {/* <div className="col-6 col-sm-12 col-lg-6">
            <FormControl className="w-75">
              <InputLabel id="demo-simple-select-label">AC Or Non-Ac</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="AC Or Non-Ac"
                value={values.ac_or_non_ac}
                onChange={(e) => setValues({ ...values, ac_or_non_ac: e.target.value })}
                error={errors.ac_or_non_ac}
              >
                <MenuItem value={'AC'}>AC</MenuItem>
                <MenuItem value={'Non-AC'}>Non-AC</MenuItem>
              </Select>
            </FormControl>
          </div> */}
          <div className="col-6 col-sm-12 col-lg-6">
            <div className="custom-file w-75">
              <input type="file" className="custom-file-input Carimg" name="filename"
                onChange={(e) =>
                  setValues({ ...values, car_image: e.target.files[0] })
                }
              />
              <label className="custom-file-label Carimg-label"
                htmlFor="customFile">
                {values.car_image ? values.car_image.name : 'Car Image'}
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Insurance Date" className="w-75"
                value={dayjs(values.insurance_date)}
                format="DD/MM/YYYY"
                onChange={(dateValue) => setValues({ ...values, insurance_date: new Date(dateValue).toLocaleDateString() })}
                error={errors.insurance_date}
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <Autocomplete
              freeSolo
              options={locationOptions}
              getOptionLabel={getLocationOptionLabel}
              className="w-75"
              onChange={(event, newValue) => {
                setValues({ ...values, location_id: newValue.id })
              }}
              onInputChange={locationhandleInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Location" error={Boolean(errors.location_id)} variant="outlined" />
              )}
              inputValue={locationOptionsValue}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Tax Date" className="w-75"
                value={dayjs(values.tax_date)}
                format="DD/MM/YYYY"
                onChange={(dateValue) => setValues({ ...values, tax_date: new Date(dateValue).toLocaleDateString() })}
                error={errors.tax_date}
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 col-sm-12 col-lg-6">
            <TextField id="outlined-basic" label="Loaction Point" variant="outlined" className="w-75"
              onChange={(e) => { setValues({ ...values, location: e.target.value }) }} value={values.location}
              error={errors.location}
            />
          </div>
        </div>

        {/* SUBMIT AND CANCEL */}
        <div className="d-flex my-5  justify-content-center">
          <button type="submit" className="btn mx-1" style={{ backgroundColor: '#5E35B1', color: 'white' }}>
            Update
          </button>
          <button type="button" className="btn btn-secondary mx-1" onClick={handleReset}>
            Cancel
          </button>
        </div>
      </form>
    </MainCard>
  );
}

export default EditManageCars;
