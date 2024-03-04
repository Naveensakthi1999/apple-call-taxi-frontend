import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import BlockIcon from '@mui/icons-material/Block';
import '../../../assets/scss/mystyle.css';
import { Link } from 'react-router-dom';

import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/config';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const SmallcardCancellation = ({ isLoading }) => {
  const theme = useTheme();
  const [count, setCount] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/dashboard/cancelbooking_count`)
      .then(result => {
        if (result.data.Status) {
          setCount(result.data.Result[0].count);
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <Link to="/dashboard/BookingCancellation" className="dashboard-count"   style={{ fontWeight: 500, color: '#FFFFFF',userSelect:"none" }}>
        <CardWrapper border={false} content={false} className='small-card-cancellation' >
          <Box sx={{ p: 2 , backgroundColor: '#d07746'}}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: '#fff',
                      color: '#d07746'
                    }}
                  >
                    <BlockIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Typography variant="h4" sx={{ color: '#fff' }}>
                     {count}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25,border:"none" }}>
                      CANCELLATION
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
        </Link>
      )}
    </>
  );
};

SmallcardCancellation.propTypes = {
  isLoading: PropTypes.bool
};

export default SmallcardCancellation;
