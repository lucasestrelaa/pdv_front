import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography, Grid, Divider, Button, FormControl, InputLabel, Input } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

import { SET_PRODUCT } from 'store/actions';

// ==============================|| SAMPLE PAGE ||============================== //

const NewSale = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('authorization');
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
      .get('http://localhost:3001/product', { headers: { Authorization: token }, params: { id_store: 1 } })
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

  // const AddProducts = (index) => {
  const products = useSelector((state) => state.customization.product);
  // console.log(products)
  // }

  const [qnt, setQnt] = useState([])

  //quando seleciona a quantidade de um produto, é preciso adicionar a quantidade naquele produto específico
  const handleQnt = (id_item, change) => {
    console.log('handleQnt: ', id_item, ' - ', change)
    let qntItem = change
    setQnt({
      "idItem": id_item,
      "qnt": qntItem
    })
  }

  const Add = (item) => {
    let productsItens = products;
    console.log(productsItens)
    console.log(qnt)
    item = {...item, quantidade: qnt.qnt}
    dispatch({
      type: SET_PRODUCT,
      product: item
    });
  };

  return (
    <MainCard title="Vendas">
      /Formulário cliente
      {data.length > 0 && (
        <Grid container spacing={gridSpacing} style={{ paddingTop: 10 }}>
          {data.map((res, index) => {
            return (
              <Grid key={`${index}`} item xs={12} sx={{ pt: '16px !important' }}>
                <Typography variant="body2">
                  {res.name} - {res.color} - {res.price} -
                  <FormControl>
                    <InputLabel htmlFor="pswd">Quantidade</InputLabel>
                    <Input type="number" id={`qnt${index}`} aria-describedby="my-helper-text" onChange={(e) => handleQnt(index, e.target.value)} />
                  </FormControl>
                  <Button onClick={() => Add(res)}>Adicionar produto</Button>
                </Typography>
                <Divider />
              </Grid>
            );
          })}
        </Grid>
      )}
      <Button onClick={() => alert('Nova venda')}>Nova venda</Button>
    </MainCard>
  );
};

export default NewSale;
