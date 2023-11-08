// assets
import { IconTool } from '@tabler/icons';

// constant
const icons = { IconTool };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const adm = {
  id: 'adm',
  title: 'Administrativo',
  type: 'group',
  children: [
    {
      id: 'administrativo',
      title: 'Administrativo',
      type: 'item',
      url: '/adm',
      icon: icons.IconTool,
      breadcrumbs: false
    }
  ]
};

export default adm;
