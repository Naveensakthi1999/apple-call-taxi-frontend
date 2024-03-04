// assets
import { IconAddressBook , IconCar , IconDatabasePlus  } from '@tabler/icons-react';

// constant
const icons = {
  IconAddressBook ,
  IconCar ,
  IconDatabasePlus ,
};

// ==============================|| Booking MENU ITEMS ||============================== //

const Booking = {
  id: 'utilities',
  title: 'Booking',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Manage Booking',
      type: 'item',
      url: '/Booking/ManageBooking',
      icon: icons.IconAddressBook ,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Running Cars',
      type: 'item',
      url: '/Booking/RunningCars',
      icon: icons.IconCar ,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'No of Bookings',
      type: 'item',
      url: '/Booking/NoOfBooking',
      icon: icons.IconDatabasePlus ,
      breadcrumbs: false
    },


    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default Booking;
