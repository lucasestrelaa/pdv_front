import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

// material-ui
import { Typography, Grid, FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import { gridSpacing } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';

const Payment = () => {
  const products = useSelector((state) => state.products);
  console.log(products);
  const [data, setData] = useState([{
    "typePayment": "",
    "paymentTerm": 0,
    "interest": 0,
    "price": 0.0,
    "paid": false,
  }]);

  useEffect(() => {
    setData()
  }, []);

  const submit = () => {};

  //Handlers
  const handleTypePayment = (value) => {
    setData({
        ...data, 
        typePayment: value
    })
  }
  const handlePaymentTerm = (value) => {
    setData({
        ...data, 
        paymentTerm: value
    })
  }
  const handleInterest = (value) => {
    setData({
        ...data, 
        interest: value
    })
  }
  const handlePrice = (value) => {
    setData({
        ...data, 
        price: value
    })
  }
  const handlePaid = (value) => {
    setData({
        ...data, 
        paid: value
    })
  }
  

  return (
    <MainCard title="Novo Produto">
    <form onSubmit={() => submit()}>
      <Grid container spacing={gridSpacing} style={{ paddingTop: 10, textAlign: 'center' }}>
        <Typography>Pagamento</Typography>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
          <FormControl>
            <OutlinedInput
              id="fname"
              type="text"
              placeholder="Tipo de Pagamento"
              onChange={(e) => handleTypePayment(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Digite o tipo de pagamento.</FormHelperText>
          </FormControl>
          <FormControl>
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
          <FormControl style={{ width: '20%' }}>
            <OutlinedInput
              id="fname"
              type="number"
              placeholder="Juros"
              onChange={(e) => handleInterest(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Digite os juros(a.a).</FormHelperText>
          </FormControl>
          <FormControl>
            <OutlinedInput 
                id="fname" 
                placeholder="Valor" 
                onChange={(e) => handlePrice(e.target.value)} 
            />
            <FormHelperText id="my-helper-text">Digite o preço.</FormHelperText>
          </FormControl>
          <FormControl>
            <OutlinedInput 
                id="fname" 
                type="checkbox" 
                placeholder="Pago" 
                onChange={(e) => handlePaid(e.target.value)} 
            />
            <FormHelperText id="my-helper-text">Pago?</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
          <OutlinedInput id="outlined-adornment-email-login" type="submit" name="dataInput" placeholder="Input" inputProps={{}} />
        </Grid>
      </Grid>
    </form>
    </MainCard>
  );
};

export default Payment;
