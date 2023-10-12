import { useState } from 'react';

// material-ui
import { FormControl, FormHelperText, Grid, OutlinedInput } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

const Clients = () => {
  const { clientId } = useParams()
  console.log(clientId)
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
    if(clientId != null){

      getClient(clientId);
    }
  }, []);

  const getClient = (clientId) => {
    console.log("getClient")
    axios
      .get(`${urlBase}/client/${clientId}`, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          setData(response.data[0]);
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
      });
    }
  };
  // const [data, setData] = useState([]);
  // const token = sessionStorage.getItem('authorization');
  // useEffect(() => {
  //   // setLoading(false);
  //   if (token != '') {
  //     // getClients();
  //   }
  // }, []);

  // const getClients = () => {
  //   axios
  //     .get('http://localhost:3001/client', { headers: { Authorization: token } })
  //     .then(function (response) {
  //       if (response.status == 200) {
  //         setData(response.data);
  //         console.log(response);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  // function convert() {
  //   let base64String = '';
  //   // let file = document.getElementById('imagemInput').result

  //   // console.log(btoa(file))
  //   let file = document.querySelector('OutlinedInput[type=file]');
  //   console.log(file);

  //   let reader = new FileReader();
  //   console.log('next');

  //   reader.onload = function () {
  //     base64String = 'data:image/jpeg;base64,' + reader.result.replace('data:', '').replace(/^.+,/, '');

  //     // imageBase64Stringsep = base64String;

  //     return base64String;
  //   };
  //   return reader.readAsDataURL(file);
  // }


  function handleDocument(e) {
    setData((data) => ({
      ...data,
      document: e.target.value
    }));
  }
  function handleName(e) {
    setData((data) => ({
      ...data,
      name: e.target.value
    }));
  }
  function handleDescription(e) {
    setData((data) => ({
      ...data,
      description: e.target.value
    }));
  }
  function handlePhone_1(e) {
    setData((data) => ({
      ...data,
      phone_1: e.target.value
    }));
  }
  function handlePhone_2(e) {
    setData((data) => ({
      ...data,
      phone_2: e.target.value
    }));
  }
  function handleEmail_1(e) {
    setData((data) => ({
      ...data,
      email_1: e.target.value
    }));
  }
  function handleEmail_2(e) {
    setData((data) => ({
      ...data,
      email_2: e.target.value
    }));
  }
  function handleAddress(e) {
    setData((data) => ({
      ...data,
      address: e.target.value
    }));
  }


  return (
    <MainCard title="Novo Cliente">
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="hidden" id='id_client' value={data.id_client} />
        <Grid container spacing={gridSpacing} style={{ paddingTop: 10, textAlign: 'center' }}>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.name}
                name="datadocument"
                onChange={handleDocument}
                placeholder="Documento"
                inputProps={{}}
              />

              <FormHelperText id="my-helper-text">Digite o documento do cliente.</FormHelperText>
            </FormControl>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.name}
                name="dataName"
                onChange={handleName}
                placeholder="Nome"
                inputProps={{}}
              />

              <FormHelperText id="my-helper-text">Digite o nome do cliente.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.description}
                name="datadescricao"
                onChange={handleDescription}
                placeholder="Descrição"
                inputProps={{}}
              />
              <FormHelperText id="my-helper-text">Descrição.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl style={{ width: '20%' }}>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.phone_1}
                name="dataphone1"
                onChange={handlePhone_1}
                placeholder="Telefone 1"
                inputProps={{}}
              />
              <FormHelperText id="my-helper-text">Digite o telefone 1.</FormHelperText>
            </FormControl>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.phone_2}
                name="dataphone2"
                onChange={handlePhone_2}
                placeholder="Telefone 2"
                inputProps={{}}
              />
              <FormHelperText id="my-helper-text">Digite o telefone 2.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.email_1}
                name="dataemail1"
                onChange={handleEmail_1}
                placeholder="Email 1"
                inputProps={{}}
              />
            </FormControl>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.email_2}
                name="dataemail1"
                onChange={handleEmail_2}
                placeholder="Email 2"
                inputProps={{}}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.address}
                name="dataaddress"
                onChange={handleAddress}
                placeholder="Endereço"
                inputProps={{}}
              />
            </FormControl>
          </Grid>
          {/*<Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="file"
                value={data.image}
                name="dataImage"
                onChange={handleImage}
                placeholder=""
                inputProps={{}}
              />
              <FormHelperText id="my-helper-text">Selecione a imagem.</FormHelperText>
            </FormControl>
          </Grid>*/}
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <OutlinedInput id="outlined-adornment-email-login" type="submit" name="dataInput" placeholder="Input" inputProps={{}} />
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default Clients;
