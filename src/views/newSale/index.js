import { useState, useEffect } from 'react';

import { OutlinedInput } from '@mui/material';

// material-ui
// import { styled } from '@mui/material/styles';

import {
  Divider,
  // Avatar,
  Typography,
  Grid,
  Button,
  // ListItem,
  // ListItemAvatar,
  // ListItemSecondaryAction,
  // ListItemText
} from '@mui/material';
import { gridSpacing } from 'store/constant';
// import User1 from 'assets/images/users/user-round.svg';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { formatMoney } from 'ui-component/helpers/helpers';
// import { Link } from 'react-router-dom';

// styles
// const ListItemWrapper = styled('div')(({ theme }) => ({
//   cursor: 'pointer',
//   padding: 16,
//   '&:hover': {
//     background: theme.palette.primary.light
//   },
//   '& .MuiListItem-root': {
//     padding: 0
//   }
// }));

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
      .get(`${urlBase}/product/store/${id_store}`, { headers: { Authorization: token }, params: { id_store: 1 } })
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

  // const search = (productName) => {
  //   data.filter(res => res.name )
  //   console.log(productName)
  // }

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
            {/* <input onChange={(e) => search(e.target.value)}/> */}
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
                              {formatMoney(res.price)}
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
                          <Typography variant="subtitle2">{formatMoney((res.price) * parseInt(res.quantidade))}</Typography>

                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                    </Grid>
                  )
                }
              })}
              <Grid direction="column" style={{ background: "#c3c3c3", padding: 2 }} xs={12}>
                Total {formatMoney(calcularTotal())}
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
