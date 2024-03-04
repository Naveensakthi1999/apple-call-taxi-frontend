import '../../assets/scss/mystyle.css';
import MainCard from 'ui-component/cards/MainCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { gridSpacing } from 'store/constant';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, ListItemAvatar, Typography, Grid } from '@mui/material';
import React,{useEffect, useState} from 'react';

// ==============================|| Customer Report Function ||============================== //
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


function CallCenterFessCount(props) {
  const theme = useTheme();

  const [totalAmount, setTotalAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');

  useEffect(() => {
    setTotalAmount(props.totalPayableAmount);
    setPaidAmount(props.totalPaidAmount);
}, [props.totalPaidAmount, props.totalPayableAmount])

  return (
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {/* Total Amount 56,055 */}
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <CardWrapper border={false} content={false} className="big-card-total-booking">
                <Box sx={{ p: 2.25, backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)'}}>
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
                              color: '#a78dcf'
                            }}
                          >
                            <CurrencyRupeeIcon fontSize="inherit" />
                          </Avatar>
                        </ListItemAvatar>
                        <Grid item>
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{totalAmount}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ mb: 1.25 }}>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        TOTAL AMOUNT
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardWrapper>
            </Grid>

            {/* Total Kms 3428 */}
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <CardWrapper border={false} content={false} className="big-card-running-cars">
                <Box sx={{ p: 2.25,backgroundImage: 'linear-gradient(to right, #1D976C 0%, #93F9B9  51%, #1D976C  100%)'  }}>
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
                              color: "#2bc08f"
                            }}
                          >
                            <CurrencyRupeeIcon fontSize="inherit" />
                          </Avatar>
                        </ListItemAvatar>
                        <Grid item>
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{paidAmount}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ mb: 1.25 }}>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        PAID AMOUNT
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardWrapper>
            </Grid>

            {/* Total Trips 169 */}
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <CardWrapper border={false} content={false} className="big-card-tommorow-calls">
                <Box sx={{ p: 2.25,backgroundImage: 'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)', }}>
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
                              color: "#ee609c"
                            }}
                          >
                             <CurrencyRupeeIcon fontSize="inherit" />
                          </Avatar>
                        </ListItemAvatar>
                        <Grid item>
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{totalAmount-paidAmount}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ mb: 1.25 }}>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#fff'
                        }}
                      >
                        PENDING AMOUNT
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardWrapper>
            </Grid>
          </Grid>
        </Grid>
  );
}

export default CallCenterFessCount;
