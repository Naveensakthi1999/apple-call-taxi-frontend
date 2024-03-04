// assets
import { IconUsers  ,IconCarGarage ,IconUserShare  } from '@tabler/icons-react';

// constant
const icons = { IconUsers  ,IconCarGarage,IconUserShare   };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const Report = {
  id: 'sample-docs-roadmap',
  title:"Report",
  type: 'group',
  children: [
    {
      id: 'CustomerReport',
      title: 'Customer Report',
      type: 'item',
      url: '/Report/CustomerReport',
      icon: icons.IconUsers ,
      breadcrumbs: false
    },
    {
      id: 'CarDetails',
      title: 'Car Details',
      type: 'item',
      url: '/Report/CarDetails',
      icon: icons.IconCarGarage  ,
      breadcrumbs: false
    },
    {
      id: 'OwnerReport',
      title: 'Owner Report',
      type: 'item',
      url: '/Report/OwnerReport',
      icon: icons.IconUserShare  ,
      breadcrumbs: false
    },
    
  ]
};

export default Report;
