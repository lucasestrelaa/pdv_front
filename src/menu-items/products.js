// assets
import { IconShoppingCart, IconPlus } from '@tabler/icons';

// constant
const icons = { IconShoppingCart, IconPlus };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const products = {
  id: 'products',
  title: 'Produtos',
  type: 'group',
  children: [
    {
      id: 'newProduct',
      title: 'Novo Produto',
      type: 'item',
      url: '/newproduct',
      icon: icons.IconPlus,
      breadcrumbs: false
    },
    {
      id: 'products',
      title: 'Produtos',
      type: 'item',
      url: '/products',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default products;
