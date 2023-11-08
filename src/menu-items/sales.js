// assets
import { IconBuildingStore, IconPlus } from '@tabler/icons';

// constant
const icons = { IconBuildingStore, IconPlus };

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
      icon: icons.IconPlus,
      breadcrumbs: false
    },
    {
      id: 'sales',
      title: 'Vendas',
      type: 'item',
      url: '/sales',
      icon: icons.IconBuildingStore,
      breadcrumbs: false
    }
  ]
};

export default sales;
