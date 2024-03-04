import '../../assets/scss/mystyle.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button } from '@mui/material';
import NewCallRequest from '../dashboard/Default/NewCallRequest';
import AvailableCars from '../dashboard/Default/AvailableCars';
import { Grid } from '@mui/material';
// ==============================|| ManagerOwner Function ||============================== //

function AddManageBooking() {


  return (
    <MainCard
      title="Add Manage Booking"
      secondary={
        <Link to="/Booking/ManageBooking">
          <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
            Manage Booking List
          </Button>
        </Link>
      }
    >
      <Grid item xs={12}>
        <div className="row mb-5">
          <div className=" col-lg-4 col-sm-12 col-md-12 ">
            <NewCallRequest noneheading={""} />
          </div>
          <div className=" col-lg-8 col-sm-12 col-md-12 ">
            <AvailableCars noneheading={""} />
          </div>
        </div>
      </Grid>
    </MainCard>
  );
}

export default AddManageBooking;
