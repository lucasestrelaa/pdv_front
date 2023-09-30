import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';
// import Login from './views/pages/authentication/authentication3/Login3.js'

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
// import { Link } from 'react-router-dom';


// ==============================|| APP ||============================== //

const App = () => {
  // const [logged, setLogged] = useState([])
  const customization = useSelector((state) => state.customization);
  console.log('routes')
  useEffect(()=>{
  },[])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>

          <Routes />

        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
