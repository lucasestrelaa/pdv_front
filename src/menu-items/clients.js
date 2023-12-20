// assets
import { IconUser, IconUserPlus } from '@tabler/icons';

// constant
const icons = { IconUser, IconUserPlus };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const clients = {
  id: 'clients',
  title: 'Clientes',
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
      title: 'Clientes',
      type: 'item',
      url: '/clients',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ],
  profile: [1, 2]
};

export default clients;
