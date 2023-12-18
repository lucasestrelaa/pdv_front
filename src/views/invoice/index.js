import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { formatMoney } from 'ui-component/helpers/helpers';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


const Invoice = () => {
  const [invoices, setInvoices] = useState([])
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const idStore = sessionStorage.getItem('id_store');

  useEffect(() => {
    getInvoices()
  }, [])
  

  const getInvoices = () => {
    axios
    .get(`${urlBase}/invoice/${idStore}`, { headers: { Authorization: token } })
    .then(function (response) {
        if (response.status == 200) {
            console.log("referência: ", response.data)
            if(response.data.length > 0 && typeof(response.data) != "string"){
              setInvoices(response.data)
            }
        }
    })
    .catch(function (error) {
        console.log("Error: ", error.config.headers.Authorization);
        if (error.config.headers.Authorization !== null) {
            console.log("Token Expirado!")
            return navigate('/')
        }
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Referência</TableCell>
            <TableCell align="right">Preço</TableCell>
            <TableCell align="right">Pago</TableCell>
            <TableCell align="right">Data de Pagamento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((row) => (
            <TableRow
              key={row.description}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.reference}
              </TableCell>
              <TableCell align="right">{formatMoney(row.price)}</TableCell>
              <TableCell align="right">{row.paid}</TableCell>
              <TableCell align="right">{row.payday}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Invoice