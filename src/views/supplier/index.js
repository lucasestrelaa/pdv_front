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

const NewSupplier = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase")
  const id_store = sessionStorage.getItem('id_store');
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getSuppliers();
    }
  }, []);

  const getSuppliers = async () => {
    try {
      const response = await axios.get(`${urlBase}/supplier/store/${id_store}`, { headers: { Authorization: token } });
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.log('Error: ', error.config.headers.Authorization);
      if (error.config.headers.Authorization !== null) {
        console.log('Token Expirado!');
        return navigate('/');
      }
    }
    // axios
    //   .get(`${urlBase}/supplier/store/${id_store}`, { headers: { Authorization: token } })
    //   .then(function (response) {
    //     if (response.status == 200) {
    //       setData(response.data);
    //       console.log(response);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log("Error: ", error.config.headers.Authorization);
    //     if(error.config.headers.Authorization !== null){
    //       console.log("Token Expirado!")
    //       return navigate('/')
    //     }
    //   });
  };

  const deleteSupplier = (supplierId) => {
    let resposta = "Deseja apagar esse fornecedor?";
    if(window.confirm(resposta) === true){
      return navigate(`/editSupplier/${supplierId}`)
    }
  }

  
  const redirNewSupplier = () => {
    return navigate('/newSupplier')
  }


  return (
    <MainCard title="Produtos">
      <Button onClick={() => redirNewSupplier()}>Novo fornecedor</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">CNPJ</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.cnpj} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.cnpj}</TableCell>
                <TableCell align="right">{row.phone_1}</TableCell>
                <TableCell align="right">{row.email_1}</TableCell>
                <TableCell align="right">
                  <Grid container key={`${row.name}`} direction="column">
                    <Typography variant="subtitle1" color="inherit">
                    <Link to={`/editSupplier/${row.id_supplier}`}><IconEdit stroke={1.5} size="1.3rem" /></Link>
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                    <IconX stroke={1.5} size="1.3rem" onClick={() => deleteSupplier(row.id_supplier)}/>
                    </Typography>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {data.length > 0 &&
        <Grid container direction="column">
          {data.map((res, index) => {
            return (
              <Grid container key={`${index}`} direction="column">
                <Grid item>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" color="inherit">
                        {res.name} - {res.cnpj}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {res.phone_1} / {res.email_1}
                          </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <Link to={`/editSupplier/${res.id_supplier}`}><IconEdit stroke={1.5} size="1.3rem" /></Link> 
                          </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <IconX stroke={1.5} size="1.3rem" onClick={() => deleteSupplier(res.id_supplier)}/>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                    {res.description}
                    </Typography>
                  </Grid>

              </Grid>
            )
          })}
        </Grid>
      } */}
    </MainCard>
  );
};

export default NewSupplier;
