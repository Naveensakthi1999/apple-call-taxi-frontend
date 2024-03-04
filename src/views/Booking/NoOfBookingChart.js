// BarChart.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';

const BarChartComponent = ({date}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [date]);
  
  const fetchData = () => {
    axios.get(`${API_BASE_URL}/noofbooking/noofbooking_day_count?date=${date}`)
        .then((result) => {
            if (result.data.Status) {
              setData(result.data.Result);
            } else {
                alert(result.data.Error);
            }
        })
        .catch((err) => console.log(err));
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day_of_month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="No Of Booking" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
