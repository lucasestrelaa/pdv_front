import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { useTheme } from '@mui/material/styles';


// material-ui
import {  styled } from '@mui/material/styles';

import {
  Divider,
  Avatar,
  Typography, 
  Grid, 
  Button, 
  Input, 
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material';
import { gridSpacing } from 'store/constant';
import User1 from 'assets/images/users/user-round.svg';



// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

import { SET_PRODUCT } from 'store/actions';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

// ==============================|| SAMPLE PAGE ||============================== //

const NewSale = () => {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  // const [typePayment, setTypePayment] = useState('');
  // const [paid, setPaid] = useState('');
  // const [paymentTerm, setPaymentTerm] = useState('');
  // const [interest, setInterest] = useState('');
  // const [price, setPrice] = useState('');
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const products = useSelector((state) => state.customization.product);

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

    <MainCard xs={8} title="Vendas">

      <Grid container spacing={gridSpacing}>
        {data.length > 0 && (
          <Grid container xs={6} direction="column" style={{ padding: 10 }}>
            Produtos da loja
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
        <Grid container xs={6} style={{ padding: 10 }}>
          Carrinho
          {products.map((res, index) => (
            <Grid key={`${index}`}>
              <ListItemWrapper>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar alt="John Doe" src={User1} />
                  </ListItemAvatar>
                  <ListItemText primary={`${res.name}`} />
                  <ListItemSecondaryAction>
                    <Grid container justifyContent="flex-end">
                      <Grid item xs={12}>
                        <Typography variant="caption" display="block" gutterBottom>
                          {res.quantidade}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                  <Grid item xs={12} sx={{ pb: 2 }}>
                    <Typography variant="subtitle2">Preço: R${(parseFloat(res.price) * parseInt(res.quantidade).toFixed(2))}</Typography>
                  </Grid>

                  <Grid item xs={12} sx={{ pb: 2 }}>
                    <Typography variant="subtitle2">Cor: {`${res.color}`}</Typography>
                  </Grid>
                  {/* <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Chip label="Unread" sx={chipErrorSX} />
                  </Grid>
                  <Grid item>
                    <Chip label="New" sx={chipWarningSX} />
                  </Grid>
                </Grid>
              </Grid> */}
                </Grid>
              </ListItemWrapper>
              <Divider />
            </Grid>
          ))}
          <Grid direction="column" style={{ background: "#c3c3c3", padding: 10 }} xs={12}>Total</Grid>
        </Grid>
      </Grid>

    </MainCard>
  );
};

export default NewSale;
