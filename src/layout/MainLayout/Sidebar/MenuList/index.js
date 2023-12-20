// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    const idUserType = sessionStorage.getItem('id_user_type')
    switch (item.type) {
      case 'group':
        // if()
        if(item.profile.includes(parseInt(idUserType))){
          return <NavGroup key={item.id} item={item} />;
        }else{
          return
        }
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
