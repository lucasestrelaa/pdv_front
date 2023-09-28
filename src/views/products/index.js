import { useState, useEffect } from 'react';

// material-ui
import { Typography, Grid, Divider, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

const NewProduct = () => {
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

  return (
    <MainCard title="Produtos">
      <Button onClick={() => alert('Novo produto')}>Nova produto</Button>
      {data.length > 0 && 
      <Grid container spacing={gridSpacing} style={{ paddingTop: 10 }}>
        {data.map((res, index) => {
          return (
            <Grid key={`${index}`} item xs={12} sx={{ pt: '16px !important' }}>
              <Typography variant="body2">{res.name} - {res.color} - {res.price}</Typography>
              <Divider />
            </Grid>
          )
        })}
      </Grid>
      }
    </MainCard>
  );
};

export default NewProduct;
