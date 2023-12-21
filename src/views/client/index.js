import { useState, useEffect } from 'react';

// material-ui
import { Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { IconEdit, IconX } from '@tabler/icons';
import { Link } from 'react-router-dom';



// ==============================|| SAMPLE PAGE ||============================== //

const Client = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase");
  const id_store = sessionStorage.getItem('id_store');
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getClients();
    }
  }, []);

  const getClients = () => {
    axios
      .get(`${urlBase}/client/store/${id_store}`, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status == 200) {
          setData(response.data);
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteClient = (clientId) => {
    let resposta = "Deseja apagar esse cliente?";
    if(window.confirm(resposta) === true){
      return navigate(`/editClient/${clientId}`)
    }
  }

  
  const redirNewClient = () => {
    return navigate('/newClient')
  }


  return (
    <MainCard title="Clientes">
      <Button onClick={() => redirNewClient()}>Novo cliente</Button>
      {data.length > 0 &&
        <Grid container direction="column">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Documento</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Telefone</TableCell>
                  <TableCell align="center">Email</TableCell>
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
                        <TableCell align="left">{res.document}</TableCell>
                        <TableCell align="center" component="th" scope="row">{res.name}</TableCell>
                        <TableCell align="center">{res.description}</TableCell>
                        <TableCell align="center">{res.phone_1}</TableCell>
                        <TableCell align="center">{res.email_1}</TableCell>
                        <TableCell align="center"><Link to={`/editClient/${res.id_client}`}><IconEdit stroke={1.5} size="1.3rem" /></Link> </TableCell>
                        <TableCell align="right"><IconX stroke={1.5} size="1.3rem" onClick={() => deleteClient(res.id_client)}/></TableCell>
                      </TableRow>
                )
              })}
            </TableBody>
              </Table>
            </TableContainer>
        </Grid>
      }
    </MainCard>
  );
};

export default Client;
