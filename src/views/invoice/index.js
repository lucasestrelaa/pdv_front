import { useState, useEffect } from 'react';

// material-ui
// import { Typography, Button } from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
// import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
// import { IconEdit, IconX } from '@tabler/icons';
// import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

// console.log(rows)

const Invoice = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  // const id_store = sessionStorage.getItem('id_store');
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getInvoices();
    }
  }, []);
  
  const getInvoices = async () => {
    try {
      const response = await axios.get(`${urlBase}/invoices`, { headers: { Authorization: token } });
      console.log(response);
      setRows(response.data);
    } catch (error) {
      console.log('Error: ', error.config.headers.Authorization);
      if (error.config.headers.Authorization !== null) {
        console.log('Token Expirado!');
        return navigate('/');
      }
    }

  };

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Referencia</TableCell>
              <TableCell >Loja</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Pago</TableCell>
              <TableCell align="right">Dia de Pagamento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id_invoid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.reference}</TableCell>
                <TableCell>{row.id_store}</TableCell>
                <TableCell align="right">{row.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                <TableCell align="right">{row.paid == 1 ? "pago" : "não pago"}</TableCell>
                <TableCell align="right">{row.payday != null || row.payday != "" ? "Não Pago" : row.payday}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
export default Invoice