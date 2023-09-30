import { useState, useEffect } from 'react';

// material-ui
import { Typography, Grid, Button } from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { IconEdit, IconX } from '@tabler/icons';
import { Link } from 'react-router-dom';



// ==============================|| SAMPLE PAGE ||============================== //

const NewProduct = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('authorization');
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getProducts();
    }
  }, []);

  const getProducts = () => {
    axios
      .get('http://localhost:3001/product', { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          setData(response.data);
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const redirNewProduct = () => {
    return navigate('/newProduct')
  }


  return (
    <MainCard title="Produtos">
      <Button onClick={() => redirNewProduct()}>Novo produto</Button>
      {data.length > 0 &&
        <Grid container direction="column">
          {data.map((res, index) => {
            return (
              <Grid container key={`${index}`} direction="column">
                <Grid item>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" color="inherit">
                        {res.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {res.price}
                          </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <Link to={`/editProduct/?productId=${index}`}><IconEdit stroke={1.5} size="1.3rem" /></Link> 
                          </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <IconX stroke={1.5} size="1.3rem" />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                    {res.color}
                    </Typography>
                  </Grid>

              </Grid>
            )
          })}
        </Grid>
      }
    </MainCard>
  );
};

export default NewProduct;
