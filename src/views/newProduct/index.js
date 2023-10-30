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

const Products = () => {
  const { productId } = useParams()
  console.log(productId)
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
    if(productId != null){

      getProduct(productId);
    }
  }, []);

  const getProduct = (productId) => {
    console.log("getProduct")
    axios
      .get(`${urlBase}/product/${productId}`, { headers: { Authorization: token } })
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
    //// console.log('Submitou: ', data);
    setData({
      ...data,
      id_store: id_store
    })
    if(data.id_product){
      axios
      .put(`${urlBase}/product/${data.id_product}`, data, { headers: { Authorization: token } })
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
      .post(`${urlBase}/product`, data, { headers: { Authorization: token } })
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
  //     // getProducts();
  //   }
  // }, []);

  // const getProducts = () => {
  //   axios
  //     .get('http://localhost:3001/product', { headers: { Authorization: token } })
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

  function handleName(e) {
    setData((data) => ({
      ...data,
      name: e.target.value
    }));
  }
  function handleCategory(e) {
    setData((data) => ({
      ...data,
      category: e.target.value
    }));
  }
  function handleAmount(e) {
    setData((data) => ({
      ...data,
      amount: e.target.value
    }));
  }
  function handlePrice(e) {
    setData((data) => ({
      ...data,
      price: e.target.value
    }));
  }
  function handleColor(e) {
    setData((data) => ({
      ...data,
      color: e.target.value
    }));
  }
  // function handleHex(e) {
  //   setData((data) => ({
  //     ...data,
  //     hex: e.target.value
  //   }));
  // }
  // function handleImage() {
  //   const imageBase64 = convert();
  //   console.log('image: ', imageBase64);
  //   setData((data) => ({
  //     ...data,
  //     image: imageBase64
  //   }));
  // }

  return (
    <MainCard title="Novo Produto">
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="hidden" id='id_product' value={data.id_product} />
        <Grid container spacing={gridSpacing} style={{ paddingTop: 10, textAlign: 'center' }}>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
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

              <FormHelperText id="my-helper-text">Digite o nome do produto.</FormHelperText>
            </FormControl>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.category}
                name="dataName"
                onChange={handleCategory}
                placeholder="Categoria"
                inputProps={{}}
              />
              <FormHelperText id="my-helper-text">Digite a categoria.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl style={{ width: '20%' }}>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="number"
                value={data.amount}
                name="dataName"
                onChange={handleAmount}
                placeholder="Quantidade"
                inputProps={{}}
              />
              <FormHelperText id="my-helper-text">Digite a quandidade.</FormHelperText>
            </FormControl>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="number"
                value={data.price}
                name="dataPreco"
                onChange={handlePrice}
                placeholder="Preço"
                inputProps={{}}
              />
              <FormHelperText id="my-helper-text">Digite o preço.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={data.color}
                name="dataColor"
                onChange={handleColor}
                placeholder="Cor"
                inputProps={{}}
              />
            </FormControl>
            {/*<FormControl>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="color"
                value={data.hex}
                name="dataHex"
                onChange={handleHex}
                placeholder=""
                inputProps={{}}
              />
              </FormControl> */}
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

export default Products;
