import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';
import VerifyRoute from 'routes/VerifyRoute';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <>
  <VerifyRoute>
    <Outlet />
    <Customization />
  </VerifyRoute>
  </>
);

export default MinimalLayout;
