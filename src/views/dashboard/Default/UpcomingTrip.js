import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { API_BASE_URL } from '../../../utils/config';
import axios from 'axios';
import moment from 'moment';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }));

function UpcomingTrip(props) {
  const id = props.id;
  const [items, setItems] = useState([]);
  const fetchData = () => {
    axios.get(`${API_BASE_URL}/availablecars/upcoming_trip_list?id=${id}`)
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
    fetchData();
  }, [id]);

  return (
    <div>
      <BootstrapDialog
        onClose={() => {
          props.handleClose(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={props.data}
      >

        <DialogTitle sx={{ m: 0, p: 2, fontSize: 18 }} id="customized-dialog-title">
          Upcoming Trip
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={() => {
            props.handleClose(false);
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className=" example">
            <table className="table table-hover">
              <thead className="fixed-header ">
                <tr>
                  <th>S.NO</th>
                  <th>Booking Id</th>
                  <th>Customer Name</th>
                  <th>Mobile</th>
                  <th>Date & Time</th>
                  <th>Pickup</th>
                  <th>Drop</th>
                </tr>
              </thead>
              <tbody>
              {items.map((item, i) => (
                <tr key={item.id}>
                  <th>{i + 1}</th>
                  <td>{item.booking_id}</td>
                  <td>{item.cust_name}</td>
                  <td>{item.mobile}</td>
                  <td>{moment(item.pickup_date).format("DD/MM/YYYY")} @ {moment(item.pickup_time).format("hh:mm A")}</td>
                  <td>{item.from_loaction}</td>
                  <td>{item.to_loaction}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            onClick={() => {
              props.handleClose(false);
            }}
          >
            close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default UpcomingTrip;
