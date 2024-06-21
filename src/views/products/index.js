import { useState, useEffect } from 'react';

// material-ui
import { Typography, Grid, Button } from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { IconEdit, IconX } from '@tabler/icons';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ==============================|| SAMPLE PAGE ||============================== //

const NewProduct = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const id_store = sessionStorage.getItem('id_store');
  // function createData(category, name, amount, price) {
  //   return { category, name, amount, price };
  // }
  // let rows = []

  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      const getProducts = async () => {
        if (id_store != null) {
          try {
            const response = await axios.get(`${urlBase}/products/store/${id_store}`, { headers: { Authorization: token } });
            setData(response.data);
            setRows(response.data);
          } catch (error) {
            console.log('Error: ', error.config.headers.Authorization);
            if (error.config.headers.Authorization !== null) {
              console.log('Token Expirado!');
              return navigate('/');
            }
          }
        } else {
          console.log('Token Expirado!');
          return navigate('/');
        }
      };
      getProducts();
    }
    console.log(data);
  }, []);

  const deleteProduct = (productId) => {
    let resposta = 'Deseja apagar esse produto?';
    if (window.confirm(resposta) === true) {
      return navigate(`/editProduct/${productId}`);
    }
  };

  const redirNewProduct = () => {
    return navigate('/newProduct');
  };

  return (
    <MainCard title="Produtos">
      <Button onClick={() => redirNewProduct()}>Novo produto</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.category}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                <TableCell align="right">
                  <Grid container key={`${row.name}`} direction="column">
                    <Typography variant="subtitle1" color="inherit">
                      <Link to={`/editProduct/${row.id_product}`}>
                        <IconEdit stroke={1.5} size="1.3rem" />
                      </Link>
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                      <IconX stroke={1.5} size="1.3rem" onClick={() => deleteProduct(row.id_product)} />
                    </Typography>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default NewProduct;
