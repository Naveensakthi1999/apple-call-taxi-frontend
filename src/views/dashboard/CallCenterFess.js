import MainCard from 'ui-component/cards/MainCard';
import * as React from 'react';
import '../../assets/scss/mystyle.css';
import PropTypes from 'prop-types';
//import Tabs from '@mui/material/Tabs';
//import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PendingCallCenterFess from './PendingCallCenterFess';
//import PaidCallCenterFess from './PaidCallCenterFess';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`
//   };
// }

function CallCenterFess() {
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <MainCard
      title="Pending fees & Paid fees"
    >
      <Box sx={{ width: '100%' }}>
        {/* <Box className="d-flex justify-content-center">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Pending fees" {...a11yProps(0)} />
            <Tab label="Paid fees" {...a11yProps(1)} />
          </Tabs>
        </Box> */}

        {/* Running Cars */}
        {/* <CustomTabPanel value={value} index={0}>
        <PendingCallCenterFess/>
        </CustomTabPanel> */}

        {/* Available Cars */}
        {/* <CustomTabPanel value={value} index={1}>
        <PaidCallCenterFess/>
        </CustomTabPanel> */}

        <PendingCallCenterFess/>
      </Box>
    </MainCard>
  );
}

export default CallCenterFess;
