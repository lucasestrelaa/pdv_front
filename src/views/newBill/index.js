import React, { useState } from 'react';

// material-ui
import { Alert, FormControl, FormHelperText, Grid, OutlinedInput, Snackbar } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

const NewBill = () => {
  const navigate = useNavigate();
  const { billId } = useParams()
  console.log(billId)
  // const params = new URLSearchParams(location);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const id_store = sessionStorage.getItem('id_store');
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(billId != null){

      getBill(billId);
    }
  }, []);

  const getBill = (billId) => {
    console.log("getBill: ", billId)
    axios
      .get(`${urlBase}/balance/${billId}`, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          setData(response.data[0]);
          console.log(response.data[0]);
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

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('Submitou: ', data);
    setData({
      ...data,
      id_store: id_store
    })

    console.log(data)
    if(data.id_balance){
      console.log("tem id balance: ", data.id_balance, data.execution)
      axios
      .put(`${urlBase}/balance/${data.id_balance}`, data, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response);
          handleClose()
        }
      })
      .catch(function (error) {
        console.log("Error: ", error.config.headers.Authorization);
        if(error.config.headers.Authorization !== null){
          console.log("Token Expirado!")
          return navigate('/')
        }
      });
    }else{
      console.log("não tem id balance: ")
      axios
      .post(`${urlBase}/balance`, data, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response);
          handleClose()
        }
      })
      .catch(function (error) {
        console.log("Error: ", error.config.headers.Authorization);
        if(error.config.headers.Authorization !== null){
          console.log("Token Expirado!")
          return navigate('/')
        }
      });
    }
  };

  const handleClose = () => {
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
      return navigate('/bills')
    }, 1000);
  }


  function handleDescription(e) {
    setData((data) => ({
      ...data,
      description: e.target.value
    }));
  }
  function handleAmount(e) {
    setData((data) => ({
      ...data,
      amount: e.target.value
    }));
  }
  function handleExecution(e) {
    setData((data) => ({
      ...data,
      execution: e.target.value
    }));
  }


  return (
    <MainCard title="Novo Contas a Pagar e Receber">
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="hidden" id='id_balance' value={data.id_balance} />
        <Grid container spacing={gridSpacing} style={{ paddingTop: 10, textAlign: 'center' }}>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl style={{ width: "50%"}}>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.description}
                name="dataDescription"
                onChange={handleDescription}
                placeholder="Descrição"
                inputProps={{}}
              />

              <FormHelperText id="my-helper-text">Digite a descrição.</FormHelperText>
            </FormControl>
            <FormControl style={{ width: "50%"}}>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.amount}
                name="dataAmount"
                onChange={handleAmount}
                placeholder="Valor"
                inputProps={{}}
              />

              <FormHelperText id="my-helper-text">Digite o valor.</FormHelperText>
            </FormControl>
            <FormControl style={{ width: "100%"}}>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="date"
                value={data.execution}
                name="date"
                onChange={handleExecution}
                placeholder="Data de efetivação"
                inputProps={{}}
              />

              <FormHelperText id="my-helper-text">Digite a data de efetivação.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <OutlinedInput style={{ width: "100%"}} id="outlined-adornment-email-login" type="submit" name="dataInput" placeholder="Input" inputProps={{}} />
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ left: "50%"}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Dados salvos!
            </Alert>
          </Snackbar>
    </MainCard>
  );
};

export default NewBill;
