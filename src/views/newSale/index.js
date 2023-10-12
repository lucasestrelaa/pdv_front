import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

// material-ui
import { Typography, Grid, Button, Input } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

import { SET_PRODUCT } from 'store/actions';

// ==============================|| SAMPLE PAGE ||============================== //

const NewSale = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  // const [typePayment, setTypePayment] = useState('');
  // const [paid, setPaid] = useState('');
  // const [paymentTerm, setPaymentTerm] = useState('');
  // const [interest, setInterest] = useState('');
  // const [price, setPrice] = useState('');
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  /**
   * Todas as vendas, puxar os dados dos produtos/vendas
   */
  useEffect(() => {
    if (token != '') {
      getProducts();
    }
  }, []);

  const getProducts = () => {
    axios
      .get(`${urlBase}/product`, { headers: { Authorization: token }, params: { id_store: 1 } })
      .then(function (response) {
        if (response.status == 200) {
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const AddProducts = (index) => {
  // const products = useSelector((state) => state.customization.product);
  // console.log(products)
  // }

  const [qnt, setQnt] = useState([]);

  //quando seleciona a quantidade de um produto, é preciso adicionar a quantidade naquele produto específico
  const handleQnt = (id_item, change) => {
    let qntItem = change;
    setQnt({
      idItem: id_item,
      qnt: qntItem
    });
  };

  const Add = (item) => {
    item = { ...item, quantidade: qnt.qnt };
    dispatch({
      type: SET_PRODUCT,
      product: item
    });
  };



  return (
    <MainCard title="Vendas">
      Produtos da loja
      {data.length > 0 && (
        <Grid container direction="column" style={{ paddingTop: 10 }}>
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
                          <Typography variant="subtitle1" color="inherit">
                            <Input
                              defaultValue={0}
                              sx={{ width: 40 }}
                              type="number"
                              id={`qnt${index}`}
                              aria-describedby="my-helper-text"
                              onChange={(e) => handleQnt(index, e.target.value)}
                            />
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            <Button onClick={() => Add(res)}>Adicionar produto</Button>
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
    </MainCard>
  );
};

export default NewSale;
