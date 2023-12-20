import { useState, useEffect } from 'react';

// material-ui
import { Typography, Grid, Button, Alert } from '@mui/material';
// import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { IconEdit, IconX } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { formatMoney } from 'ui-component/helpers/helpers';



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
        <Grid container direction="column">
          {data.map((res, index) => {
            return (
              <Grid container key={`${index}`} direction="column">
                <Alert variant="outlined" color={res.amount.toString().indexOf("-") != -1 ? "error" : "success"}>
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          {res.description} 
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {formatMoney(res.amount)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              <Link to={`/editBill/${res.id_balance}`}><IconEdit stroke={1.5} size="1.3rem" /></Link>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              <IconX stroke={1.5} size="1.3rem" onClick={() => deleteBill(res.id_balance)} />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Alert>


              </Grid>
            )
          })}
        </Grid>
      }
    </MainCard>
  );
};

export default Bills;
