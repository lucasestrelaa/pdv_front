import { useState, useEffect } from 'react';

// material-ui
import { Grid, FormControl, FormHelperText, OutlinedInput, Typography, Select, MenuItem, InputLabel } from '@mui/material';
import { gridSpacing } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import { useLocation } from 'react-router';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const id_store = sessionStorage.getItem('id_store');
  const id_user = sessionStorage.getItem('id_user');
  const dataReceived = location.state;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textResult, setTextResult] = useState('Iniciando a venda...');
  const [saleRight, setSaleRight] = useState(false);

  useEffect(() => {
    setData({
      ...data,
      price: dataReceived.total,
      typePayment: '',
      paymentTerm: 1,
      interest: 0.0,
      paid: false
    });
  }, []);

  const submit = () => {
    console.log('teste de submit');
    setLoading(true);
    setTextResult('Realizando venda');
    const keytransaction = Date() + id_store + id_user;
    //salvar os produtos
    dataReceived.products.map((res) => {
      //salvar cada produto vendido
      let dataProduct = {
        id_product: res.id_product,
        keytransaction: keytransaction,
        id_store: parseInt(id_store)
      };
      axios
        .post(`${urlBase}/productsales`, dataProduct, { headers: { Authorization: token } })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log('Error: ', error.config.headers.Authorization);
          if (error.config.headers.Authorization !== null) {
            console.log('Token Expirado!');
          }
        });
      // Pegar a quantidade de produtos
      console.log('Produtos-id: ', dataProduct.id_product);
      axios
        .get(`${urlBase}/products/product/${dataProduct.id_product}`, { headers: { Authorization: token } })
        .then(function (response) {
          if (response.status == 200) {
            console.log("buscou o produto: ",parseInt(response.data[0].amount) - parseInt(res.quantidade));
            if (parseInt(response.data[0].amount) > parseInt(res.quantidade)) {
              setSaleRight(true);
              let dataUpdate = {
                id_product: response.data[0].id_product,
                name: '' + response.data[0].name,
                category: response.data[0].category,
                amount: parseInt(response.data[0].amount) - parseInt(res.quantidade),
                price: response.data[0].price,
                id_store: response.data[0].id_store,
                color: response.data[0].color,
                hex: response.data[0].hex
              };
              axios
                .put(`${urlBase}/products/${response.data[0].id_product}`, dataUpdate, { headers: { Authorization: token } })
                .then(function (responseUpdate) {
                  console.log(responseUpdate);
                  if (responseUpdate.status == 200) {
                    console.log('Atualizou os produtos: ', responseUpdate);
                  }
                })
                .catch(function (error) {
                  console.log('Error: ', error.config.headers.Authorization);
                  if (error.config.headers.Authorization !== null) {
                    console.log('Token Expirado!');
                  }
                });
              console.log(dataUpdate)
            }
          }
        })
        .catch(function (error) {
          console.log('Error: ', error);
          if (error.config.headers.Authorization !== null) {
            console.log('Token Expirado!');
          }
        });

      // Pegar a quantidade de produtos vendidos daquele produto
    });
    setTextResult('Produtos da venda foram salvos');
    if (saleRight) {
      //salvar a venda
      let dataSale = { ...data, keytransaction, id_store, id_user };
      console.log('O que vou salvar no sale: ', dataSale);
      axios
        .post(`${urlBase}/sales`, dataSale, { headers: { Authorization: token } })
        .then(function (response) {
          if (response.status == 200) {
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log('Error: ', error.config.headers.Authorization);
          if (error.config.headers.Authorization !== null) {
            console.log('Token Expirado!');
            return navigate('/');
          }
        });

      setTextResult('Venda realizada com sucesso!');
    }
  };

  //Handlers
  const handleTypePayment = (value) => {
    setData({
      ...data,
      typePayment: value
    });
  };
  const handlePaymentTerm = (value) => {
    setData({
      ...data,
      paymentTerm: value
    });
  };
  const handleInterest = (value) => {
    setData({
      ...data,
      interest: value
    });
  };
  const handlePrice = (value) => {
    setData({
      ...data,
      price: value
    });
  };
  const handlePaid = (value) => {
    setData({
      ...data,
      paid: value
    });
  };

  return (
    <>
      {!loading ? (
        <MainCard title="Pagamento">
          <Grid container spacing={gridSpacing} style={{ paddingTop: 10, textAlign: 'center' }}>
            <Grid item xs={12} sx={{ pt: '16px !important' }}>
              <FormControl style={{ width: '50%' }}>
                <InputLabel id="typePayment">Pagamento</InputLabel>
                <Select
                  labelId="typePayment"
                  id="typePayment"
                  value={data.typePayment}
                  label="Tipo de pagamento"
                  onChange={(e) => handleTypePayment(e.target.value)}
                >
                  <MenuItem value={'credito'}>Crédito</MenuItem>
                  <MenuItem value={'debito'}>Débito</MenuItem>
                  <MenuItem value={'Pix'}>Pix</MenuItem>
                  <MenuItem value={'Dinheiro'}>Dinheiro</MenuItem>
                </Select>

                <FormHelperText id="my-helper-text">Digite o tipo de pagamento.</FormHelperText>
              </FormControl>
              <FormControl style={{ width: '50%' }}>
                <OutlinedInput id="fname" type="number" placeholder="Parcelas" onChange={(e) => handlePaymentTerm(e.target.value)} />
                <FormHelperText id="my-helper-text">Digite parcelas.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ pt: '16px !important' }}>
              <FormControl style={{ width: '50%' }}>
                <OutlinedInput id="fname" type="number" placeholder="Juros" onChange={(e) => handleInterest(e.target.value)} />
                <FormHelperText id="my-helper-text">Digite os juros(a.a).</FormHelperText>
              </FormControl>
              <FormControl style={{ width: '50%' }}>
                <OutlinedInput id="fname" placeholder="Valor" onChange={(e) => handlePrice(e.target.value)} value={data.price} />
                <FormHelperText id="my-helper-text">Digite o preço.</FormHelperText>
              </FormControl>
              <FormControl style={{ width: '20%' }}>
                <OutlinedInput id="fname" type="checkbox" placeholder="Pago" onChange={(e) => handlePaid(e.target.checked)} />
                <FormHelperText id="my-helper-text">Pago?</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ pt: '16px !important' }} onClick={() => submit()}>
              <OutlinedInput
                style={{ width: '100%' }}
                id="outlined-adornment-email-login"
                type="submit"
                name="dataInput"
                placeholder="Input"
                inputProps={{}}
              />
            </Grid>
          </Grid>
        </MainCard>
      ) : (
        <MainCard title="Processando">
          <Grid container spacing={gridSpacing} style={{ paddingTop: 10, textAlign: 'center' }}>
            <Typography>{textResult}</Typography>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default Payment;
