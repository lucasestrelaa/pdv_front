import { useState } from 'react';

// material-ui
import { Input, FormControl, InputLabel, FormHelperText, Button, Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import axios from 'axios';
// import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

const Products = () => {
  const params = new URLSearchParams(window.location.pathname);
  console.log(params)
  const [data, setData] = useState([]);
  // const [name, setName] = useState('');
  // const [category, setCategory] = useState('');
  // const [amount, setAmount] = useState('');
  // const [price, setPrice] = useState('');
  // const [color, setColor] = useState('');
  // const [hex, setHex] = useState('');

  useEffect(() => {
    getProduct(params.get("productId"))
  },[])

  const getProduct = (productId) => {
    axios.get(`http://localhost:3001/product/${productId}`, { headers: { Authorization: token } })
        .then(function (response) {
          if (response.status == 200) {
            setData(response.data);
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  } 

  const submit = (e) => {
    setFirstName(e.target.value);
    setLastName(e.target.value);
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

  return (
    <MainCard title="Novo Produto">
      <Grid container spacing={gridSpacing} style={{ paddingTop: 10, textAlign: "center" }}>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
          <FormControl>
            <InputLabel htmlFor="fname">Nome</InputLabel>
            <Input id="fname" type="text" value={data.name} onChange={(e) => setName(e.target.value)} />
            <FormHelperText id="my-helper-text">Digite o nome do produto.</FormHelperText>
          </FormControl>
          <FormControl>
          <InputLabel htmlFor="fname">Categoria</InputLabel>
          <Input id="fname" value={data.category} onChange={(e) => setCategory(e.target.value)} />
          <FormHelperText id="my-helper-text">Digite a categoria.</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
          <FormControl style={{ width: '20%'}}>
            <InputLabel htmlFor="fname">Quantidade</InputLabel>
            <Input id="fname" type="number" value={data.amount} onChange={(e) => setAmount(e.target.value)} />
            <FormHelperText id="my-helper-text">Digite a quandidade.</FormHelperText>
          </FormControl>
          <FormControl>
          <InputLabel htmlFor="fname">Preço</InputLabel>
          <Input id="fname" value={data.price} onChange={(e) => setPrice(e.target.value)} />
          <FormHelperText id="my-helper-text">Digite o preço.</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
          <FormControl>
            <InputLabel htmlFor="fname">Cor</InputLabel>
            <Input id="fname" value={data.color} onChange={(e) => setColor(e.target.value)} />
            <FormHelperText id="my-helper-text">Digite a cor.</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lname">Hexadecimal</InputLabel>
            <Input id="lname"  type='color' value={data.hex} onChange={(e) => setHex(e.target.value)} />
            <FormHelperText id="my-helper-text">Digite o hexadecimal.</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ pt: '16px !important' }}>
          <Button onClick={() => submit}>Enviar</Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Products;
