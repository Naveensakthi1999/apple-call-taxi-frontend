import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { TextField } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import DownloadingIcon from '@mui/icons-material/Downloading';
import '../../assets/scss/mystyle.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// ==============================|| Customer Report Function ||============================== //

function MonthlyOwnerReport() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // DOWNLOAD FUNCTION

  const onButtonClick = () => {
    const pdfUrl = '../../assets/car_details.xls';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'car_details.xls'; // specify the filename
    document.body.appendChild(link);
    link.click();
    // document.body.removeChild(link);
  };

  return (
    <MainCard title="Owner Report">
      <div>
        {/* FROM TO DATE PICKER */}
        <div className="row mt-4">
          <div className="col-6 col-sm-12 col-lg-6  d-flex ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label={'"month" and "year"'} views={['month', 'year']} className="w-75 mx-4" />
            </LocalizationProvider>
            <Button variant="contained" color="secondary" style={{ padding: '7px 30px 7px 30px' }} endIcon={<DownloadingIcon />}>
              GENERATE
            </Button>
          </div>
        </div>

        {/* SEARCH FILED  */}
        {/* DOWNLOAD */}

        {/*  TABLE Search */}
        <div className="d-flex justify-content-end my-2">
          <TextField id="filled-search" label="Search field" type="search" variant="outlined" />
        </div>

        {/* TABLE DATA */}
        <div className=" example">
          <table className="table table-hover">
            <thead className="fixed-header ">
              <tr>
                <th>S.NO</th>
                <th>Download </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th>1</th>
                <th>
                  <Button variant="text" onClick={onButtonClick}>
                  01-09-2023 RUTHRAN MONTHLY_STATUS.XLS
                  </Button>
                </th>
                
              </tr>
              <tr>
                <th>2</th>
                <th>
                  <Button variant="text" onClick={onButtonClick}>
                  01-09-2023 GURU MONTHLY_STATUS.XLS
                  </Button>
                </th>
              </tr>
              <tr>
                <th>3</th>
                <th>
                  <Button variant="text" onClick={onButtonClick}>
                  01-09-2023 VELRAJ MONTHLY_STATUS.XLS
                  </Button>
                </th>
              </tr>
              <tr>
                <th>4</th>
                <th>
                  <Button variant="text" onClick={onButtonClick}>
                    01-09-2023 RAJARATHINAM MONTHLY_STATUS.XLS
                  </Button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TABLE PAGINATION */}
        <TablePagination
          component="div"
          count={100}
          display="flex"
          flexDirection="column"
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </MainCard>
  );
}

export default MonthlyOwnerReport;
