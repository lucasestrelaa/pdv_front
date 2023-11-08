// assets
import { IconUser, IconUserPlus } from '@tabler/icons';

// constant
const icons = { IconUser, IconUserPlus };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const clients = {
  id: 'clients',
  title: 'Clients',
  type: 'group',
  children: [
    {
      id: 'newClient',
      title: 'Novo Cliente',
      type: 'item',
      url: '/newclient',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },
    {
      id: 'clients',
      title: 'Clients',
      type: 'item',
      url: '/clients',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default clients;
