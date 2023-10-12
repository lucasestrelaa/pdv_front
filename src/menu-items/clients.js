// assets
import { IconShoppingCart } from '@tabler/icons';

// constant
const icons = { IconShoppingCart };

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
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    },
    {
      id: 'clients',
      title: 'Clients',
      type: 'item',
      url: '/clients',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default clients;
