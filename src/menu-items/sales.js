// assets
import { IconShoppingCart } from '@tabler/icons';

// constant
const icons = { IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const sales = {
  id: 'sales',
  title: 'Vendas',
  type: 'group',
  children: [
    {
      id: 'newSale',
      title: 'Nova venda',
      type: 'item',
      url: '/newsale',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    },
    {
      id: 'sales',
      title: 'Vendas',
      type: 'item',
      url: '/sales',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default sales;
