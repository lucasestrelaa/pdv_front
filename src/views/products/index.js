import { useState, useEffect } from 'react';

// material-ui
import {
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper
} from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { IconEdit, IconX } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { formatMoney } from 'ui-component/helpers/helpers';



// ==============================|| SAMPLE PAGE ||============================== //

const NewProduct = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase")
  const id_store = sessionStorage.getItem('id_store');
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getProducts();
    }
  }, []);

  const getProducts = () => {
    if (id_store != null) {
      axios
        .get(`${urlBase}/product/store/${id_store}`, { headers: { Authorization: token } })
        .then(function (response) {
          if (response.status == 200) {
            setData(response.data);
            console.log(response.data);
          }
        })
        .catch(function (error) {
          console.log("Error: ", error.config.headers.Authorization);
          if (error.config.headers.Authorization !== null) {
            console.log("Token Expirado!")
            return navigate('/')
          }
        });
    } else {
      console.log("Token Expirado!")
      return navigate('/')
    }

  };

  const deleteProduct = (productId) => {
    let resposta = "Deseja apagar esse produto?";
    if (window.confirm(resposta) === true) {
      return navigate(`/editProduct/${productId}`)
    }
  }

  const redirNewProduct = () => {
    return navigate('/newProduct')
  }



  return (
    <MainCard title="Produtos">
      <Button onClick={() => redirNewProduct()}>Novo produto</Button>
      {data.length > 0 &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Categoria</TableCell>
                <TableCell align="center">Produto</TableCell>
                <TableCell align="center">Qnt Estoque</TableCell>
                <TableCell align="center">Preço unitário</TableCell>
                <TableCell align="center">Cor</TableCell>
                <TableCell align="center">Editar</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((res, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{res.category}</TableCell>
                    <TableCell align="center" component="th" scope="row">{res.name}</TableCell>
                    <TableCell align="center">{res.amount}</TableCell>
                    <TableCell align="center">{formatMoney(res.price)}</TableCell>
                    <TableCell align="center">{res.color}</TableCell>
                    <TableCell align="center"><Link to={`/editProduct/${res.id_product}`}><IconEdit stroke={1.5} size="1.3rem" /></Link> </TableCell>
                    <TableCell align="right"><IconX stroke={1.5} size="1.3rem" onClick={() => deleteProduct(res.id_product)} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

      }
    </MainCard>
  );
};

export default NewProduct;
