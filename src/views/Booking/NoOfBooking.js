// project imports
import MainCard from 'ui-component/cards/MainCard';
import NoOfBookingBarChart from './NoOfBookingChart';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import BookIcon from '@mui/icons-material/Book';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => {
  const [length, setLength] = useState();
  const [date, setdate] = useState(new Date());

  axios.defaults.withCredentials = true;
  const fetchlength = () => {
      axios.get(`${API_BASE_URL}/noofbooking/noofbooking_count?date=${date}`)
          .then(result => {
              if (result.data.Status) {
                  setLength(result.data.Result[0].count)
              }
          })
  }

  useEffect(() => {
    fetchlength();
}, [date]);

  return (
  <MainCard title="No of Booking" 
  secondary={
    <Button variant="contained" color="secondary" endIcon={<BookIcon size={'20px'} />}>
      {length}
    </Button>
  }>
   <div className="row">
        <div className="col-6 col-sm-12 col-lg-6">
            <div className="my-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'"month" and "year"'} views={['month', 'year']}
                        value={dayjs(date)}
                        onChange={(dateValue) => setdate(new Date(dateValue))}
                    />
                </LocalizationProvider>
            </div>
        </div>
    </div>
  {/* CHART */}
   <NoOfBookingBarChart date={date}/>
  </MainCard>
)};

export default Typography;
