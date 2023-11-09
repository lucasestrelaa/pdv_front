import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Products = Loadable(lazy(() => import('views/products')));
const NewProduct = Loadable(lazy(() => import('views/newProduct')));
const Suppliers = Loadable(lazy(() => import('views/supplier')));
const NewSupplier = Loadable(lazy(() => import('views/newSupplier')));
const Client = Loadable(lazy(() => import('views/client')));
const NewClient = Loadable(lazy(() => import('views/newClient')));
const Sales = Loadable(lazy(() => import('views/sales')));
const NewSale = Loadable(lazy(() => import('views/newSale')));
const Payment = Loadable(lazy(() => import('views/payment')));
const Profile = Loadable(lazy(() => import('views/profile')));
const Invoice = Loadable(lazy(() => import('views/invoice')));
const Adm = Loadable(lazy(() => import('views/adm')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'newproduct',
      element: <NewProduct />
    },
    {
      path: 'editProduct/:productId',
      element: <NewProduct />
    },
    {
      path: 'sales',
      element: <Sales />
    },
    {
      path: 'newsale',
      element: <NewSale />
    },
    {
      path: 'suppliers',
      element: <Suppliers />
    },
    {
      path: 'newsupplier',
      element: <NewSupplier />
    },
    {
      path: 'editSupplier/:supplierId',
      element: <NewSupplier />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'clients',
      element: <Client />
    },
    {
      path: 'newclient',
      element: <NewClient />
    },
    {
      path: 'editClient/:clientId',
      element: <NewClient />
    },
    {
      path: 'payment',
      element: <Payment />
    },
    {
      path: 'invoice',
      element: <Invoice />
    },
    {
      path: 'adm',
      element: <Adm />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
