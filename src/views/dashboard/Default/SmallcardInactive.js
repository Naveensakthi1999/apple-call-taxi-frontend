import PropTypes from 'prop-types';
import React,{useEffect, useState} from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import CarCrashIcon from '@mui/icons-material/CarCrash';

import InActivePopup from './InActivePopup';
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
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/config';
// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const SmallcardInactive = ({ isLoading }) => {
  const theme = useTheme();
  const [count, setCount] = useState('');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(e);
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/dashboard/inactive_count`)
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
        <CardWrapper border={false} content={false} className='small-card-inactive' onClick={handleClickOpen}>
          <Box sx={{ p: 2, backgroundColor: '#7e483a' }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: '#fff',
                      color: '#7e483a'
                    }}
                  >
                    <CarCrashIcon fontSize="inherit" />
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
                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                     INACTIVE
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )} 
      {/* POP-UP */}
      <InActivePopup data={open} modal={handleClose} />
    </>
  );
};

SmallcardInactive.propTypes = {
  isLoading: PropTypes.bool
};

export default SmallcardInactive;
