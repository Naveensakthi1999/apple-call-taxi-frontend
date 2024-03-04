import { Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_BASE_URL } from '../utils/config';

const PrivateRoute = ({children}) => {

  const [showMenu, setShowMenu] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/verify`)
      .then(result => {
        if (result.data.Status) {
          setShowMenu(result.data.role);
        } else {
          localStorage.removeItem("valid");
        }
      }).catch(err => console.log(err))
  }, [])
  console.log(showMenu);
  return localStorage.getItem("valid") ? children : <Navigate to="/pages/login" />
}

export default PrivateRoute