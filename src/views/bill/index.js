import { useState, useEffect } from 'react';

// material-ui
import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { IconEdit, IconX } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { formatData, formatMoney } from 'ui-component/helpers/helpers';



// ==============================|| SAMPLE PAGE ||============================== //

const Bills = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase");
  const id_store = sessionStorage.getItem('id_store');
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getBills();
    }
  }, []);

  const getBills = () => {
    axios
      .get(`${urlBase}/balance/balance/${id_store}`, { headers: { Authorization: token } })
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

  const deleteBill = (billId) => {
    let resposta = "Deseja apagar esse registro?";
    if (window.confirm(resposta) === true) {
      return navigate(`/editBill/${billId}`)
    }
  }


  const redirNewBill = () => {
    return navigate('/newBill')
  }


  return (
    <MainCard title="Contas a Pagar e Receber">
      <Button onClick={() => redirNewBill()}>Novo contas a pagar/receber</Button>
      {data.length > 0 &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Descrição</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Data de excecução</TableCell>
                <TableCell align="center">Editar</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((res, index) => {
                return (
                  // <Alert variant="outlined" key={index} color={res.amount.toString().indexOf("-") != -1 ? "error" : "success"}>
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{res.amount.toString().indexOf("-") != -1 ? <div style={{ background: "red", color: "#fff" }}>Saída</div> : <div style={{ background: "green", color: "#fff" }}>Entrada</div>}</TableCell>
                    <TableCell align="left">{res.description}</TableCell>
                    <TableCell align="center">{formatMoney(res.amount)}</TableCell>
                    <TableCell align="center">{formatData(res.execution)}</TableCell>
                    <TableCell align="center"><Link to={`/editBill/${res.id_balance}`}><IconEdit stroke={1.5} size="1.3rem" /></Link></TableCell>
                    <TableCell align="right"><IconX stroke={1.5} size="1.3rem" onClick={() => deleteBill(res.id_balance)} /></TableCell>
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

export default Bills;
