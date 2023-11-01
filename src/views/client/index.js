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



// ==============================|| SAMPLE PAGE ||============================== //

const NewClient = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase")
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getClients();
    }
  }, []);

  const getClients = () => {
    axios
      .get(`${urlBase}/client/store/:id_store`, { headers: { Authorization: token } })
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
    <MainCard title="Produtos">
      <Button onClick={() => redirNewClient()}>Novo cliente</Button>
      {data.length > 0 &&
        <Grid container direction="column">
          {data.map((res, index) => {
            return (
              <Grid container key={`${index}`} direction="column">
                <Grid item>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" color="inherit">
                        {res.name} - {res.document}
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
                            <Link to={`/editClient/${res.id_client}`}><IconEdit stroke={1.5} size="1.3rem" /></Link> 
                          </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <IconX stroke={1.5} size="1.3rem" onClick={() => deleteClient(res.id_client)}/>
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
      }
    </MainCard>
  );
};

export default NewClient;
