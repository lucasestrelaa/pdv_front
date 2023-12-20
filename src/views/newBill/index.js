import { useState } from 'react';

// material-ui
import { FormControl, FormHelperText, Grid, OutlinedInput } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatMoney } from 'ui-component/helpers/helpers';
// import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

const NewBill = () => {
  const { billId } = useParams()
  console.log(billId)
  // const params = new URLSearchParams(location);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const id_store = sessionStorage.getItem('id_store');
  const [data, setData] = useState([]);
  // const [name, setName] = useState('');
  // const [category, setCategory] = useState('');
  // const [amount, setAmount] = useState('');
  // const [price, setPrice] = useState('');
  // const [color, setColor] = useState('');
  // const [hex, setHex] = useState('');

  useEffect(() => {
    if(billId != null){

      getBill(billId);
    }
  }, []);

  const getBill = (clientId) => {
    console.log("getBill: ", clientId)
    axios
      .get(`${urlBase}/balance/${billId}`, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          setData(response.data[0]);
          console.log(response);
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
    if(data.id_client){
      axios
      .put(`${urlBase}/client/${data.id_client}`, data, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response);
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
      axios
      .post(`${urlBase}/client`, data, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response);
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
  


  return (
    <MainCard title="Novo Contas a Pagar e Receber">
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="hidden" id='id_client' value={data.id_client} />
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
                value={formatMoney(data.amount)}
                name="dataAmount"
                onChange={handleAmount}
                placeholder="Valor"
                inputProps={{}}
              />

              <FormHelperText id="my-helper-text">Digite o valor.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <OutlinedInput style={{ width: "100%"}} id="outlined-adornment-email-login" type="submit" name="dataInput" placeholder="Input" inputProps={{}} />
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default NewBill;
