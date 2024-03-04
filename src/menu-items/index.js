import dashboard from './dashboard';
import setting from './setting';
import Booking from './Booking';
// import pages from './pages';
import Report from './Report';
import master from './master'
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  // items: [dashboard,master,Booking, Report,pages,setting] removed login page in sidebar side
  items: [dashboard,master,Booking, Report,setting]
};

export default menuItems;
