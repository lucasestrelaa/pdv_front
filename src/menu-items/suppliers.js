// assets
import { IconTruckDelivery, IconTruck } from '@tabler/icons';

// constant
const icons = { IconTruckDelivery, IconTruck };

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
      icon: icons.IconTruckDelivery,
      breadcrumbs: false
    },
    {
      id: 'suppliers',
      title: 'Fornecedores',
      type: 'item',
      url: '/suppliers',
      icon: icons.IconTruck,
      breadcrumbs: false
    }
  ]
};

export default suppliers;
