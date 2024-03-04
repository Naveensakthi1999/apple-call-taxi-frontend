import React from 'react';

import { Box, TextField,Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../../assets/scss/mystyle.css';
function UserRights() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
      <div className="card shadow">
        <div className="card-body">
          <div className="row d-flex justify-content-center ">
            <div className="col-6">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="form-group">
                    <Box style={{ width: '93%' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Employee Name"
                          onChange={handleChange}
                        >
                          <MenuItem value={'Guru'}>Guru</MenuItem>
                          <MenuItem value={'Vel'}>Deva</MenuItem>
                          <MenuItem value={'Mani'}>Raj</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="form-group">
                    <div>
                      <TextField id="outlined-basic" label="User Id" variant="outlined" className="w-100" />
                      <FormHelperText id="outlined-weight-helper-text" error>
                        @UserId
                      </FormHelperText>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="form-group">
                    <div>
                      <FormControl sx={{ width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive mt-2">
            <table className="datatable table table-stripped">
              <thead className="fixed-header ">
                <tr>
                  <th className="text-left">Module</th>
                  <th className="text-center"> Add</th>
                  <th className="text-center"> Update</th>
                  <th className="text-center">Delete</th>
                  <th className="text-center ">View</th>
                </tr>
              </thead>
              <tbody id='userightstable'>
                <tr>
                  <th>Master</th>
                  <td className=" ">
                    <div className="d-flex justify-content-center">
                       <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="d-flex justify-content-center">
                       <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="d-flex justify-content-center">
                       <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="d-flex justify-content-center">
                       <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Booking</th>
                  <td className="text-center ">
                    <div className="d-flex justify-content-center">
                       <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="d-flex justify-content-center">
                       <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="d-flex justify-content-center">
                       <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="d-flex justify-content-center">
                       <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Report</th>
                  <td className="text-center " colSpan={3}></td>
                  <td className="text-center ">
                    <div className="d-flex justify-content-center overall ">
                      
                      <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} sx={{ '& .MuiSvgIcon-root': { fontSize: 25}} } />

                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bank-details-btn d-flex justify-content-center  " style={{ marginTop: '10px'}}>
          <Button variant="contained" color='secondary'>Submit</Button>
          </div>
        </div>
      </div>
  );
}

export default UserRights;
