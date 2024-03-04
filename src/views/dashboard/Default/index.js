import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import BigcardTotalBooking from './BigcardTotalBooking';
import BigcardRunningCars from './BigcardRunningCars';
import BigcardTommorowCalls from './BigcardTommorowCalls';
import SmallcardTotalBooking from './SmallcardTotalBooking';
import SmallcardFCincurance from './SmallcardFCincurance';
import SmallcardCancellation from './SmallcardCancellation';
import SmallcardInactive from './SmallcardInactive';
import NewCallRequest from './NewCallRequest';
import AvailableCars from './AvailableCars';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <SmallcardTotalBooking isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <SmallcardFCincurance isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <SmallcardCancellation isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <SmallcardInactive isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <BigcardTotalBooking isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <BigcardRunningCars isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <BigcardTommorowCalls isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
      <div className="row mb-5">
        <div className=" col-lg-4 col-sm-12 col-md-12">
          <NewCallRequest isLoading={isLoading} noneheading={"New Call Request"} />
        </div>
        <div className=" col-lg-8 col-sm-12 col-md-12">
        <AvailableCars isLoading={isLoading} noneheading={"Available Cars"} />
        </div>
      </div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
