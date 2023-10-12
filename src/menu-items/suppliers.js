// assets
import { IconShoppingCart } from '@tabler/icons';

// constant
const icons = { IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const suppliers = {
  id: 'suppliers',
  title: 'Fornecedores',
  type: 'group',
  children: [
    {
      id: 'newSupplier',
      title: 'Novo Fornecedor',
      type: 'item',
      url: '/newsupplier',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    },
    {
      id: 'suppliers',
      title: 'Fornecedores',
      type: 'item',
      url: '/suppliers',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default suppliers;
