// assets
import { IconDashboard,IconCurrencyRupee ,IconChartBar} from '@tabler/icons';

// constant
const icons = { IconDashboard,IconCurrencyRupee ,IconChartBar};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'CallCenterFees',
      title: 'Call Center Fees',
      type: 'item',
      url: '/dashboard/CallCenterFess',
      icon: icons.IconCurrencyRupee,
      breadcrumbs: false
    },
    {
      id: 'ManageReport',
      title: 'Manage Report',
      type: 'item',
      url: '/dashboard/ManageReport',
      icon: icons.IconChartBar  ,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
