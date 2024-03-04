import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { TextField } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import '../../assets/scss/mystyle.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';

// ==============================|| Customer Report Function ||============================== //

function CarDetails() {
  const [length, setLength] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [date, setdate] = useState(new Date());

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  axios.defaults.withCredentials = true;
  const fetchlength = () => {
    axios.get(`${API_BASE_URL}/report/car_report_count?search=${search}&date=${date}`)
      .then(result => {
        if (result.data.Status) {
          setLength(result.data.Result[0].count)
        }
      })
  }

  const fetchData = () => {
    axios.get(`${API_BASE_URL}/report/car_report_list?page=${page}&limit=${rowsPerPage}&search=${search}&date=${date}`)
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
  }, [page, rowsPerPage, search, date]);

  const handlePrint = async (id, car_no) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/report/export_car_report?id=${id}&date=${date}`, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${car_no}-${dayjs(date).format('MMMM YYYY')}-monthly_status.xlsx`);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  };

  return (
    <MainCard title="Car Details">
      <div>
        {/* FROM TO DATE PICKER */}
        <div className="row mt-4">
          <div className="col-6 col-sm-12 col-lg-6  d-flex ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label={'"month" and "year"'} views={['month', 'year']}
                value={dayjs(date)}
                onChange={(dateValue) => setdate(new Date(dateValue))}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/*  Table Search */}
        <div className="d-flex justify-content-end my-2">
          <TextField id="filled-search" label="Search field" type="search" variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE PAGINATION */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={length}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Table DATA */}
        <div className=" example">
          <table className="table table-hover">
            <thead className="fixed-header ">
              <tr>
                <th>S.NO</th>
                <th>Car Details</th>
                <th>Download</th>
              </tr>
            </thead>
            {length > 0 ?
              <tbody>
                {items.map((item, i) => {
                  return (
                    <tr key={item.id}>
                      <th>{i + 1}</th>
                      <td>{item.car_no} - {item.driver_name}</td>
                      <td><Button
                              variant="contained"
                              type="button"
                              color="secondary"
                              onClick={() => handlePrint(item.car_id, item.car_no)}
                          >
                              Export
                          </Button>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
              : <tbody><td className='text-center' colSpan={9}>No matching records found</td></tbody>}
          </table>
        </div>
      </div>
    </MainCard>
  );
}



export default CarDetails