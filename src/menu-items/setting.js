// assets
import { IconSettings } from '@tabler/icons';

// constant
const icons = {
  IconSettings
};

// ==============================|| SETTING PAGES MENU ITEMS ||============================== //

const setting = {
  id: 'setting',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'setting',
      title: 'Settings',
      type: 'item',
      url: '/setting/ProfileUpdate',
      icon: icons.IconSettings ,
      breadcrumbs: false
    }
  ]
};

export default setting;
