import { lazy } from 'react';

// primary-main #2196F3
// primary-dark #1E88E5
// primary[800] #1565C0

// secondary.main #673AB7

// secondary.dark #5E35B1
// secondary[800] #4527A0

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const CallCenterFess = Loadable(lazy(() => import('views/dashboard/CallCenterFess')));
const ManageReport = Loadable(lazy(() => import('views/dashboard/ManageReport')));
const BookingCancellation = Loadable(lazy(() => import('views/dashboard/BookingCancellation')));

// Master routing
const ManageOwner = Loadable(lazy(() => import('views/master/ManageOwner')));
const EditManageOwner = Loadable(lazy(() => import('views/master/EditManageOwner')));
const AddManageOwner = Loadable(lazy(() => import('views/master/AddManageOwner')));
const EditManageDriver = Loadable(lazy(() => import('views/master/EditManageDriver')));
const ManageDriver = Loadable(lazy(() => import('views/master/ManageDriver')));
const AddManageDriver = Loadable(lazy(() => import('views/master/AddManageDriver')));
const ManageCars = Loadable(lazy(() => import('views/master/ManageCars')));
const ManageCarsExpiry = Loadable(lazy(() => import('views/master/ManageCarsExpiry')));
const AddManageCars = Loadable(lazy(() => import('views/master/AddManageCars')));
const EditManageCars = Loadable(lazy(() => import('views/master/EditManageCars')));
const CarModels = Loadable(lazy(() => import('views/master/CarModels')));
const AddCarModels = Loadable(lazy(() => import('views/master/AddCarModels')));
const EditCarModels = Loadable(lazy(() => import('views/master/EditCarModels')));
const Customer = Loadable(lazy(() => import('views/master/Customer')));
const AddCustomer = Loadable(lazy(() => import('views/master/AddCustomers')));
const EditCustomer = Loadable(lazy(() => import('views/master/EditCustomer')));
const Location = Loadable(lazy(() => import('views/master/Location')));
const AddLocation = Loadable(lazy(() => import('views/master/AddLocation')));
const EditLocation = Loadable(lazy(() => import('views/master/EditLocation')));
const StaffProfile = Loadable(lazy(() => import('views/master/StaffProfile')));
const AddStaff = Loadable(lazy(() => import('views/master/AddStaff')));
const EditStaff = Loadable(lazy(() => import('views/master/EditStaff')));
const UserRights = Loadable(lazy(() => import('views/master/UserRights')));

// Booking routing
const NoOfBooking = Loadable(lazy(() => import('views/Booking/NoOfBooking')));
const RunningCars = Loadable(lazy(() => import('views/Booking/RunningCars')));
const ManageBooking = Loadable(lazy(() => import('views/Booking/ManageBooking')));
const TomorrowCallBooking = Loadable(lazy(() => import('views/Booking/TomorrowCallBookingList')));
const AddManageBooking = Loadable(lazy(() => import('views/Booking/AddManageBooking')));
const EditManageBooking = Loadable(lazy(() => import('views/Booking/EditManageBooking')));

// Setting routing
const ProfileUpdate = Loadable(lazy(() => import('views/setting/ProfileUpdate')));

// sample page routing
const CustomerReport = Loadable(lazy(() => import('views/Report/CustomerReport')));
const CarDetails = Loadable(lazy(() => import('views/Report/CarDetails')));
const OwnerReport = Loadable(lazy(() => import('views/Report/OwnerReport')));
const MonthlyOwnerReport = Loadable(lazy(() => import('views/Report/MonthlyOwnerReport')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'CallCenterFess',
          element: <CallCenterFess/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'ManageReport',
          element: <ManageReport />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'BookingCancellation',
          element: <BookingCancellation />
        }
      ]
    },
    // master
    {
      path: 'master',
      children: [
        {
          path: 'UserRights',
          element: <UserRights />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'ManageOwner',
          element: <ManageOwner />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'AddManageOwner',
          element: <AddManageOwner />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'EditManageOwner/:id',
          element: <EditManageOwner />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'ManageDriver',
          element: <ManageDriver />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'AddManageDriver',
          element: <AddManageDriver />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'EditManageDriver/:id',
          element: <EditManageDriver />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'ManageCars',
          element: <ManageCars />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'ManageCarsExpiry',
          element: <ManageCarsExpiry />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'AddManageCars',
          element: <AddManageCars />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'EditManageCars/:id',
          element: <EditManageCars />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'CarModels',
          element: <CarModels />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'AddCarModels',
          element: <AddCarModels />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'EditCarModels/:id',
          element: <EditCarModels />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'Customer',
          element: <Customer />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'AddCustomers',
          element: <AddCustomer />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'EditCustomer/:id',
          element: <EditCustomer />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'Location',
          element: <Location />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'AddLocation',
          element: <AddLocation />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'EditLocation/:id',
          element: <EditLocation />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'StaffProfile',
          element: <StaffProfile />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'AddStaff',
          element: <AddStaff />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'EditStaff/:id',
          element: <EditStaff />
        }
      ]
    },
    // Booking
    {
      path: 'Booking',
      children: [
        {
          path: 'NoOfBooking',
          element: <NoOfBooking />
        }
      ]
    },
    {
      path: 'Booking',
      children: [
        {
          path: 'RunningCars',
          element: <RunningCars />
        }
      ]
    },
    {
      path: 'Booking',
      children: [
        {
          path: 'ManageBooking',
          element: <ManageBooking />
        }
      ]
    },
    {
      path: 'Booking',
      children: [
        {
          path: 'TomorrowCallBooking',
          element: <TomorrowCallBooking />
        }
      ]
    },
    {
      path: 'Booking',
      children: [
        {
          path: 'AddManageBooking',
          element: <AddManageBooking />
        }
      ]
    },
    {
      path: 'Booking',
      children: [
        {
          path: 'EditManageBooking/:id',
          element: <EditManageBooking />
        }
      ]
    },
    // Setting page
    {
      path: 'Setting',
      children: [
        {
          path: 'ProfileUpdate',
          element: <ProfileUpdate />
        }
      ]
    },
    
    // Report
    {
      path: 'Report',
      children: [
        {
          path: 'CustomerReport',
          element: <CustomerReport />
        }
      ]
    },
    {
      path: 'Report',
      children: [
        {
          path: 'CarDetails',
          element: <CarDetails />
        }
      ]
    },
    {
      path: 'Report',
      children: [
        {
          path: 'OwnerReport',
          element: <OwnerReport />
        }
      ]
    },
    {
      path: 'Report',
      children: [
        {
          path: 'MonthlyOwnerReport',
          element: <MonthlyOwnerReport />
        }
      ]
    },
  ]
};

export default MainRoutes;
