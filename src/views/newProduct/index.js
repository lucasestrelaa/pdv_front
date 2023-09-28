import { useState } from 'react';

// material-ui
import {
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,

} from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

const Products = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")

  const submit = (e) => {
    setFirstName(e.target.value)
    setLastName(e.target.value)
  }
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
      <FormControl>
        <InputLabel htmlFor="fname">First Name</InputLabel>
        <Input id="fname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <FormHelperText id="my-helper-text">Please enter your first name.</FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="lname">Last Name</InputLabel>
        <Input id="lname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <FormHelperText id="my-helper-text">Please enter your last name.</FormHelperText>
      </FormControl>
      <Button onClick={() => submit}>Enviar</Button>
    </MainCard>
  );
};

export default Products;
