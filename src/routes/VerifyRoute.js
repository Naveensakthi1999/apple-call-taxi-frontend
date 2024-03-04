import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_BASE_URL } from '../utils/config';
import { Navigate } from 'react-router-dom'

const VerifyRoute = ({children}) => {
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

  return localStorage.getItem("valid") ? <Navigate to="/dashboard/default" /> : children
}

export default VerifyRoute