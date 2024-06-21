import { useState, useEffect } from 'react';

import { OutlinedInput } from '@mui/material';


import {
  Divider,
  Typography,
  Grid,
  Button,

} from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';

// ==============================|| SAMPLE PAGE ||============================== //

const NewSale = () => {
  const navigate = useNavigate();
  const id_store = sessionStorage.getItem('id_store');
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const [data, setData] = useState([]);

  /**
   * 
   * Todas as vendas, puxar os dados dos produtos/vendas
   */
  useEffect(() => {
    if (token != '') {
      getProducts();
    }
  }, []);

  const getProducts = () => {
    let productsQnt = []
    axios
      .get(`${urlBase}/products/store/${id_store}`, { headers: { Authorization: token }, params: { id_store: 1 } })
      .then(function (response) {
        if (response.status == 200) {
          response.data.map((res) => {
            productsQnt.push({ ...res, quantidade: 0 })
          })
          setData(productsQnt);
        }
      })
      .catch(function (error) {
        console.log("Error: ", error.config.headers.Authorization);
        if(error.config.headers.Authorization !== null){
          console.log("Token Expirado!")
          return navigate('/')
        }
      });
  };

  const handleIncrement = (id) => {
    const updatedProdutos = data.map((produto) =>
      produto.id_product === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto
    );
    setData(updatedProdutos);
  };

  const handleDecrement = (id) => {
    const updatedProdutos = data.map((produto) =>
      produto.id_product === id && produto.quantidade > 0
        ? { ...produto, quantidade: produto.quantidade - 1 }
        : produto
    );
    setData(updatedProdutos);
  };

  const calcularTotal = () => {
    return data.reduce((total, produto) => {
      return total + produto.price * produto.quantidade;
    }, 0);
  };

  const search = (productName) => {
    console.log(productName)
  }

  const submit = () => {
    const total = calcularTotal().toFixed(2)
    const ids = []
    data.map((res) => {
      if (res.quantidade > 0) {
        ids.push({ "id_product": res.id_product, "quantidade": res.quantidade, "precoUnt": res.price, "totalPrice": (res.price * res.quantidade).toFixed(2) })
      }
    })
    return navigate('/payment',{ state: {"products": ids, "total": total}})
  }

  return (
    <MainCard xs={8} title="Vendas">
      <Grid container spacing={gridSpacing}>
        {data.length > 0 && (
          <Grid container xs={6} direction="column" style={{ padding: 10 }}>
            Produtos da loja
            <input onChange={(e) => search(e.target.value)}/>
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
                          <Grid item style={{ marginRight: '10px' }}>
                            <Typography variant="subtitle1" color="inherit">
                              R$ {res.price}
                            </Typography>
                          </Grid>
                          <Grid item>

                          </Grid>
                          <Grid item>
                            <Typography >
                              <Button onClick={() => handleIncrement(res.id_product)}>+</Button>
                              {res.quantidade}
                              <Button onClick={() => handleDecrement(res.id_product)}>-</Button>
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
              );
            })}
          </Grid>
        )}
        <Grid container xs={6} style={{ padding: 10 }}>
          Carrinho
          {data.length > 0 &&
            <>
              {data.map((res, index) => {
                if (res.quantidade > 0) {
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
                          <Typography variant="subtitle2">R${((res.price) * parseInt(res.quantidade)).toFixed(2)}</Typography>

                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                    </Grid>
                  )
                }
              })}
              <Grid direction="column" style={{ background: "#c3c3c3", padding: 2 }} xs={12}>
                Total {calcularTotal().toFixed(2)}
              </Grid>
            </>
          }
          <Grid item xs={12} sx={{ pt: '16px !important' }} onClick={() => submit()}>
            <OutlinedInput style={{ width: "100%" }} id="outlined-adornment-email-login" type="submit" name="dataInput" placeholder="Input" inputProps={{}} />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default NewSale;
