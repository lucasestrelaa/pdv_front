import { useState, useEffect } from 'react';

// material-ui
import { Typography, Button } from '@mui/material';
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

const Client = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem('UrlBase');
  const id_store = sessionStorage.getItem('id_store');
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getClients();
    }
  }, []);

  const getClients = async () => {
    try {
      const response = await axios.get(`${urlBase}/client/store/${id_store}`, { headers: { Authorization: token } });
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

  const deleteClient = (clientId) => {
    let resposta = 'Deseja apagar esse cliente?';
    if (window.confirm(resposta) === true) {
      return navigate(`/editClient/${clientId}`);
    }
  };

  const redirNewClient = () => {
    return navigate('/newClient');
  };

  return (
    <MainCard title="Clientes">
      <Button onClick={() => redirNewClient()}>Novo cliente</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Documento</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id_client} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.document}</TableCell>
                <TableCell align="right">{row.phone_1}</TableCell>
                <TableCell align="right">{row.email_1}</TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" color="inherit">
                    <Link to={`/editClient/${row.id_client}`}>
                      <IconEdit stroke={1.5} size="1.3rem" />
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" color="inherit">
                    <IconX stroke={1.5} size="1.3rem" onClick={() => deleteClient(row.id_client)} />
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default Client;
