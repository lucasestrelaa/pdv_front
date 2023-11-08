import adm from './adm';
import clients from './clients';
import dashboard from './dashboard';
import invoices from './invoice';
import products from './products';
import sales from './sales';
import suppliers from './suppliers';
// import pages from './pages';
// import utilities from './utilities';
// import other from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,adm, products, sales, suppliers, clients, invoices] //pages, utilities, other
};

export default menuItems;
