import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import UpcomingTrip from './UpcomingTrip';
import '../../../assets/scss/mystyle.css';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { API_BASE_URL } from '../../../utils/config';
import axios from 'axios';

function AvailableCars({noneheading}) {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  axios.defaults.withCredentials = true;

  // const fetchlength = () => {
  //   axios.get(`${API_BASE_URL}/availablecars/availablecars_count?search=${search}`)
  //   .then(result => {
  //     if(result.data.Status) {
  //       setLength(result.data.Result[0].count)
  //       setRowsPerPage(result.data.Result[0].count);
  //     }
  //   })
  // }

  const fetchlength = () => {
    axios.get(`${API_BASE_URL}/availablecars/availablecars_list?search=${search}`)
    .then(result => {
      if(result.data.Status) {
        setLength(result.data.Result.length)
        setRowsPerPage(result.data.Result.length);
      }
    })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/availablecars/availablecars_list?search=${search}`)
      .then((result) => {
        if (result.data.Status) {
          setItems(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchlength();
    fetchData();
  }, [page, rowsPerPage, search]);

  const handleHistory = (id) => {
    setHistory(id);
    setOpen(true);
  }

  const handleHistoryClose = (e) => {
    setOpen(e);
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

  return (
    <MainCard
      title={noneheading}
      secondary={
          <Button variant="contained" color="secondary" endIcon={<ElectricCarIcon size={'20px'} />}>
            {length}
          </Button>
      }
    >
     
     {/* POP-UP */}
     <UpcomingTrip data={open} id={history} handleClose={handleHistoryClose}  />

      {/* TABLE SEARCH */}
      <div className="d-flex justify-content-end my-2">
        <TextField id="filled-search" label="Search field" type="search" variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE SEARCH */}
      <div className="example table-fixed"  style={{height: "670px"}}>
        <table className="table table-hover ">
          <thead className="fixed-header">
            <tr>
              <th>S.NO</th>
              <th>Car Name</th>
              <th>Car No</th>
              <th>Driver</th>
              <th>Amount</th>
              <th>Loaction</th>
            </tr>
          </thead>
          { length>0 ?
          <tbody>
          {items.map((item, i) => (
              <tr
                  key={item.id}
                  style={
                    item.upcoming_trip > 0
                      ? { backgroundColor: '#00c853', color: 'white' }
                      : {}
                  }
                  onClick={() => {
                    if (item.upcoming_trip > 0) {
                      handleHistory(item.id);
                    }
                  }}
                >
              <th>{i + 1}</th>
              <td>{item.car_model_name}</td>
              <td>{item.car_no}</td>
              <td>{item.firstname}</td>
              <td>{item.total_amount_this_month}</td>
              <td>{item.location}<br/>{item.current_location}</td>
            </tr>
           ))}
           </tbody>
           : <tbody><td className='text-center' colSpan={6}>No matching records found</td></tbody>}
           </table>
      </div>

      {/* TABLE PAGINATION */}
     <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={length}
        rowsPerPage={rowsPerPage}
        page={page-1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
}

export default AvailableCars;
