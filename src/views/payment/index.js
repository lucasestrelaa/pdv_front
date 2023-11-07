import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

// material-ui
import { Grid, FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import { gridSpacing } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import { useLocation } from 'react-router';
import axios from 'axios';
// import { useParams } from 'react-router';

const Payment = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const id_store = sessionStorage.getItem("id_store")
  const id_user = sessionStorage.getItem("id_user")
  console.log("venda: ", location.state)
  const dataReceived = location.state
  console.log("dataReceived: ",dataReceived  )
  const products = useSelector((state) => state.products);
  console.log(products);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData()
  }, []);

  const submit = () => {
    console.log('teste de submit')
    console.log(data)
    
    //código de transação
    const keytransaction = Date()+id_store+id_user
    console.log("dataReceived: ",dataReceived, "keyTransaction: ", keytransaction)

    //salvar os produtos
    dataReceived.products.map((res) => {
      //salvar cada produto vendido
      let dataProduct = {
        // "id_sale": id_sale,
        "id_product": res.id_product,
        "keytransaction": keytransaction,
        "id_store": parseInt(id_store),
        
      }
      console.log('dataProduct: ', dataProduct)
      axios
      .post(`${urlBase}/productsales`, dataProduct, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    //salvar a venda
    let dataSale = {...data, keytransaction, id_store, id_user }
    console.log(dataSale)
    axios
    .post(`${urlBase}/sales`, dataSale, { headers: { Authorization: token } })
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  //Handlers
  const handleTypePayment = (value) => {
    console.log('typePayment: ', value)
    setData({
        ...data, 
        typePayment: value
    })
  }
  const handlePaymentTerm = (value) => {
    console.log('PaymentTerm: ', value)

    setData({
        ...data, 
        paymentTerm: value
    })
  }
  const handleInterest = (value) => {
    console.log('Interest: ', value)

    setData({
        ...data, 
        interest: value
    })
  }
  const handlePrice = (value) => {
    console.log('Price: ', value)

    setData({
        ...data, 
        price: value
    })
  }
  const handlePaid = (value) => {
    console.log('Paid: ', value)

    console.log(value)
    setData({
        ...data, 
        paid: value
    })
  }
  

  return (
    <MainCard title="Pagamento">
      <Grid container spacing={gridSpacing} style={{ paddingTop: 10, textAlign: 'center' }}>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
          <FormControl  style={{ width: "50%"}}>
            <OutlinedInput
              id="fname"
              type="text"
              placeholder="Tipo de Pagamento"
              onChange={(e) => handleTypePayment(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Digite o tipo de pagamento.</FormHelperText>
          </FormControl>
          <FormControl  style={{ width: "50%"}}>
            <OutlinedInput
              id="fname"
              type="number"
              placeholder="Parcelas"
              onChange={(e) => handlePaymentTerm(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Digite parcelas.</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
          <FormControl style={{ width: '50%' }}>
            <OutlinedInput
              id="fname"
              type="number"
              placeholder="Juros"
              onChange={(e) => handleInterest(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Digite os juros(a.a).</FormHelperText>
          </FormControl>
          <FormControl  style={{ width: "50%"}}>
            <OutlinedInput 
                id="fname" 
                placeholder="Valor" 
                onChange={(e) => handlePrice(e.target.value)} 
            />
            <FormHelperText id="my-helper-text">Digite o preço.</FormHelperText>
          </FormControl>
          <FormControl  style={{ width: "20%"}}>
            <OutlinedInput 
                id="fname" 
                type="checkbox" 
                placeholder="Pago" 
                onChange={(e) => handlePaid(e.target.checked)} 
            />
            <FormHelperText id="my-helper-text">Pago?</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ pt: '16px !important' }} onClick={() => submit()}>
          <OutlinedInput  style={{ width: "100%"}} id="outlined-adornment-email-login" type="submit" name="dataInput" placeholder="Input" inputProps={{}} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Payment;
