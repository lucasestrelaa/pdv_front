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

const NewStore = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase")
  const id_store = sessionStorage.getItem('id_store');
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      setData([''])
      getStores();
    }
  }, []);

  const getStores = () => {
    if(id_store != null){
      axios
      .get(`${urlBase}/store/store/${id_store}`, { headers: { Authorization: token } })
      .then(function (response) {
        console.log(response)
        if (response.status == 200) {
          setData(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log("Error: ", error.config.headers.Authorization);
        if(error.config.headers.Authorization !== null){
          console.log("Token Expirado!")
          return navigate('/')
        }
      });
    }else{
      console.log("Token Expirado!")
      return navigate('/')
    }
    
  };

  const deleteStore = (storeId) => {
    let resposta = "Deseja apagar esse produto?";
    if(window.confirm(resposta) === true){
      return navigate(`/editStore/${storeId}`)
    }
  }

  const redirNewStore = () => {
    return navigate('/newStore')
  }



  return (
    <MainCard title="Loja">
      <Button onClick={() => redirNewStore()}>Novo produto</Button>
      {data.length > 0 &&
        <Grid container direction="column">
          {data.map((res, index) => {
            return (
              <Grid container key={`${index}`} direction="column">
                <Grid item>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" color="inherit">
                        {res.cnpj} - {res.fantasy_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {res.phone_1}
                          </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <Link to={`/editStore/${res.id_store}`}><IconEdit stroke={1.5} size="1.3rem" /></Link> 
                          </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <IconX stroke={1.5} size="1.3rem" onClick={() => deleteStore(res.id_store)}/>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                    {res.color}
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

export default NewStore;
