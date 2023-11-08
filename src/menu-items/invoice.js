// assets
import { IconFileInvoice } from '@tabler/icons';

// constant
const icons = { IconFileInvoice };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const invoices = {
  id: 'invoice',
  title: 'Faturas',
  type: 'group',
  children: [
    {
      id: 'faturas',
      title: 'Faturas',
      type: 'item',
      url: '/invoice',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    }
  ]
};

export default invoices;
