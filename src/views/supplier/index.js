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

const NewSupplier = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('authorization');
  const urlBase = sessionStorage.getItem("UrlBase")
  useEffect(() => {
    // setLoading(false);
    if (token != '') {
      getSuppliers();
    }
  }, []);

  const getSuppliers = () => {
    axios
      .get(`${urlBase}/supplier`, { headers: { Authorization: token } })
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
      {data.length > 0 &&
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
      }
    </MainCard>
  );
};

export default NewSupplier;
