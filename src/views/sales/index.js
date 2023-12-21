import { useState, useEffect } from 'react';

// material-ui
import {   
  Grid,  
  Button, 
  TableContainer, 
  Table, 
  TableRow, 
  TableCell, 
  TableHead, 
  TableBody, 
  Paper 
} from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

// import { useSelector } from 'react-redux';
// Routes
import { useNavigate } from "react-router-dom";
import { formatData, formatMoney } from 'ui-component/helpers/helpers';

// Typography, Grid, Divider,
// {data.length > 0 && 
  // <Grid container spacing={gridSpacing} style={{ paddingTop: 10 }}>
  //   {data.map((res, index) => {
  //     return (
  //       <Grid key={`${index}`} item xs={12} sx={{ pt: '16px !important' }}>
  //         <Typography variant="body2">{res.paid} - {res.type_payment} - {res.price}</Typography>
  //         <Divider />
  //       </Grid>
  //     )
  //   })}
  // </Grid>
//   }

// ==============================|| SAMPLE PAGE ||============================== //

const Sales = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [current, setCurrent] = useState([])
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase")
  const id_store = sessionStorage.getItem('id_store');
  /**
   * Todas as vendas, puxar os dados dos produtos/vendas
   */
  useEffect(() => {
    if (token != '') {
      getSales();
      // GetCurrent()
    }
  }, []);

  // const GetCurrent = () => {
    // const products = useSelector((state) => state.customization.product);

  // }

  const getSales = () => {
    axios
      .get(`${urlBase}/sales/store/${id_store}`, { headers: { Authorization: token }, params: {"id_store": 1} })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response)
          setData(response.data);
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
  const redirNewSale = () => {
    return navigate('/newSale')
  }

  return (
    <MainCard title="Vendas">
      <Button onClick={() => redirNewSale()}>Nova venda</Button>
      {data.length > 0 && typeof(data) != 'string'? (
        <Grid container spacing={gridSpacing} style={{ paddingTop: 10 }}>
           <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tipo de pagamento</TableCell>
                  <TableCell align="center">Criado em</TableCell>
                  <TableCell align="center">Pago</TableCell>
                  <TableCell align="right">Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data.map((res, index) => {
                 return (
                    <TableRow 
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {res.type_payment}
                      </TableCell>
                      <TableCell align="center">{formatData(res.created_at)}</TableCell>
                      <TableCell align="center">{res.paid === 1 ? "pago" : "fatura em aberto"}</TableCell>
                      <TableCell align="right">{formatMoney(res.amount)}</TableCell>
                    </TableRow>
            // <Grid key={`${index}`} item xs={12} sx={{ pt: '16px !important' }}>
            //   <Typography variant="body2">{res.paid} - {res.type_payment} - {formatMoney(res.amount)}</Typography>
            //   <Divider />
            // </Grid>
                  )
              })}
              </TableBody>
              </Table>
            </TableContainer>
        
      </Grid>
      ):  <Grid container spacing={gridSpacing} style={{ paddingTop: 30, justifyContent: "center" }}>Não foram encontrados dados!</Grid>}
      
    </MainCard>
  );
};

export default Sales;
