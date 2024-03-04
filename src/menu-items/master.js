

import { IconCategoryPlus,IconUserShield  } from '@tabler/icons-react';

// constant
const icons = {
    IconCategoryPlus ,
    IconUserShield
};

const master = {
  id: 'master',
  title: 'Master',
  type: 'group',
  children: [
    // staff rights has hidden
    // {
    //   id: 'User-Rights',
    //   title: 'User Rights',
    //   type: 'item',
    //   url: '/master/UserRights',
    //   icon: icons.IconUserShield,
    //   breadcrumbs: false
    // },
    {
      id: 'master',
      title: 'Master',
      type: 'collapse',
      icon: icons.IconCategoryPlus ,
      children: [
        {
          id: 'ManageOwner',
          title: 'Manage Owner',
          type: 'item',
          url: '/master/ManageOwner',
          breadcrumbs: false
        },
        {
          id: 'ManageDriver',
          title: 'Manage Driver',
          type: 'item',
          url: '/master/ManageDriver',
          breadcrumbs: false
        },
        {
          id: 'CarModels',
          title: 'Cars Models',
          type: 'item',
          url: '/master/CarModels',
          breadcrumbs: false
        },
        {
          id: 'ManageCars',
          title: 'Manage Cars',
          type: 'item',
          url: '/master/ManageCars',
          breadcrumbs: false
        },
        {
          id: 'Customer',
          title: 'Customer',
          type: 'item',
          url: '/master/Customer',
          breadcrumbs: false
        },
        {
          id: 'StaffProfile',
          title: 'Staff Profile',
          type: 'item',
          url: '/master/StaffProfile',
          breadcrumbs: false
        },
        {
          id: 'Location',
          title: 'Location',
          type: 'item',
          url: '/master/Location',
          breadcrumbs: false
        },
      ]
    }
  ]
};

export default master;

