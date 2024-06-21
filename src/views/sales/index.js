import { useState, useEffect } from 'react';

// material-ui
import { Button } from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

// import { useSelector } from 'react-redux';
// Routes
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ==============================|| SAMPLE PAGE ||============================== //

const Sales = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  // const [current, setCurrent] = useState([])
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const id_store = sessionStorage.getItem('id_store');
  /**
   * Todas as vendas, puxar os dados dos produtos/vendas
   */
  useEffect(() => {
    if (token != '') {
      getSales();
    }
  }, []);

  const getSales = async () => {
    try {
      const response = await axios.get(`${urlBase}/sales/store/${id_store}`, { headers: { Authorization: token } });
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.log('Error: ', error.config.headers.Authorization);
      if (error.config.headers.Authorization !== null) {
        console.log('Token Expirado!');
        return navigate('/');
      }
    }
  };
  const redirNewSale = () => {
    return navigate('/newSale');
  };

  return (
    <MainCard title="Vendas">
      <Button onClick={() => redirNewSale()}>Nova venda</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tipo Pagamento</TableCell>
              <TableCell align="right">Loja</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id_sale} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.type_payment}</TableCell>
                <TableCell align="right">{row.id_store}</TableCell>
                <TableCell align="right">{row.amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                <TableCell align="right">{row.paid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default Sales;
