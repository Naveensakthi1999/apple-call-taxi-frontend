import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, ListItemAvatar, Typography, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Link } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
// assets
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/config';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const BigcardRunningCars = ({ isLoading }) => {
  const theme = useTheme();
  const [count, setCount] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/dashboard/runningcars_count`)
      .then(result => {
        if (result.data.Status) {
          setCount(result.data.Result[0].count);
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false} className='big-card-running-cars'>
          <Box sx={{ p: 2.25 , backgroundImage: 'linear-gradient(to right, #1D976C 0%, #93F9B9  51%, #1D976C  100%)' }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container alignItems="center">
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: '#fff',
                        color: "#2bc08f",
                      }}
                    >
                      <DirectionsCarIcon fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{count}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
             
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: "#FFFFFF"
                  }}
                >
                   <Link className='dashboard-count' to="/Booking/RunningCars" style={{ fontSize: '1rem',
                    fontWeight: 500,
                    color: "#FFFFFF",userSelect:"none"}}>
                   
                 
                  RUNNING CARS
                    </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

BigcardRunningCars.propTypes = {
  isLoading: PropTypes.bool
};

export default BigcardRunningCars;
