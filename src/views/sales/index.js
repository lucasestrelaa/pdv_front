import { useState, useEffect } from 'react';

// material-ui
import { Typography, Grid, Divider, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

import { useSelector } from 'react-redux';
// Routes
import { useNavigate } from "react-router-dom";

// ==============================|| SAMPLE PAGE ||============================== //

const Sales = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [current, setCurrent] = useState([])
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase")
  /**
   * Todas as vendas, puxar os dados dos produtos/vendas
   */
  useEffect(() => {
    if (token != '') {
      getSales();
      // GetCurrent()
    }
  }, []);

  // const GetCurrent = () => {
    const products = useSelector((state) => state.customization.product);
    console.log(products)
  // }

  const getSales = () => {
    axios
      .get(`${urlBase}/sales`, { headers: { Authorization: token }, params: {"id_store": 1} })
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
  const redirNewSale = () => {
    return navigate('/newSale')
  }

  return (
    <MainCard title="Vendas">
      <Button onClick={() => redirNewSale()}>Nova venda</Button>
      {data.length > 0 && 
      <Grid container spacing={gridSpacing} style={{ paddingTop: 10 }}>
        {data.map((res, index) => {
          return (
            <Grid key={`${index}`} item xs={12} sx={{ pt: '16px !important' }}>
              <Typography variant="body2">{res.paid} - {res.type_payment} - {res.price}</Typography>
              <Divider />
            </Grid>
          )
        })}
      </Grid>
      }
    </MainCard>
  );
};

export default Sales;
