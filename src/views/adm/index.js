import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Button } = require("@mui/material")
const { default: MainCard } = require("ui-component/cards/MainCard")

const Adm = () => {
    const navigate = useNavigate()
    // const id_store = sessionStorage.getItem('id_store');
    const token = sessionStorage.getItem('authorization');
    const urlBase = sessionStorage.getItem('UrlBase');
    const [price, setPrice] = useState([])
    const [reference, setReference] = useState(true)
    let usersArray = []
    let dataStored = []


    const generateInvoices = () => {
        //buscar usuários e a id tabela de preço
        axios
            .get(`${urlBase}/user/invoice`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    usersArray = response.data
                }
            })
            .catch(function (error) {
                console.log("Error: ", error.config);
                // if (error.config.headers.Authorization !== null) {
                    // console.log("Token Expirado!")
                    // return navigate('/')
                // }
            });
        //buscar tabela de preços
        axios
            .get(`${urlBase}/price`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    setPrice(response.data)
                }
            })
            .catch(function (error) {
                console.log(`Erro: ${error}`)
                // console.log("Error: ", error.config.headers.Authorization);
                // if (error.config.headers.Authorization !== null) {
                    // console.log("Token Expirado!")
                    // return navigate('/')
                // }
            });
        //bucar data para referência
        const data = new Date().getMonth() + "-" + new Date().getFullYear()
        //conferir se no banco já tem a referência
        axios
            .get(`${urlBase}/invoice/reference/${data}`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    if(response.data.length > 0 && typeof(response.data) != "string"){
                        setReference(true)
                        newInvoices(true)
                    }else{
                        setReference(false)
                        newInvoices(false)
                    }
                }
            })
            .catch(function (error) {
                console.log(`Error: ${error}`)
                // console.log("Error: ", error.config.headers.Authorization);
                // if (error.config.headers.Authorization !== null) {
                //     console.log("Token Expirado!")
                //     return navigate('/')
                // }
            });
    }

    const newInvoices = (isReference) => {
         //gerar boleto
         if(!isReference){
            console.log(`Referencia: ${reference}`)
            const currentReference = new Date().getMonth() + "/" + new Date().getFullYear()
            usersArray.forEach((res) => {
                let data = {
                    "description": `Fatura gerada.`,
                    "reference": currentReference,
                    "price": price[0].price,
                    "id_store": res.id_store,
                    "paid": false,
                    "payday": null,
                }
                axios.post(`${urlBase}/invoice`, data, { headers: { Authorization: token } })
                    .then((response) => {
                        if (response.status == 200) {
                            dataStored.push(response.data)
                          }
                    })
                    .catch((e) => {
                        console.log("Erro ao criar os boletos", e)
                    })
            });
         }else{
            alert("para essa referência já há faturas!")
         }

    }

    const navStore = () => {
        return navigate('/store')
    }
    const navBills = () => {
        return navigate('/bills')
    }

    return (
        <MainCard xs={8} title="Administração">
            <Button onClick={() => generateInvoices()}>Gerar faturas</Button>
            <Button onClick={() => navStore()}>Lojas</Button>
            <Button onClick={() => navBills()}>Contas a pagar/receber</Button>
        </MainCard>
    )
}

export default Adm 