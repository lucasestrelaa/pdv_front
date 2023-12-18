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
        console.log("buscar todos os usuários")
        axios
            .get(`${urlBase}/user/invoice`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    console.log("Usuários: ", response.data)
                    usersArray = response.data
                }
            })
            .catch(function (error) {
                console.log("Error: ", error.config.headers.Authorization);
                if (error.config.headers.Authorization !== null) {
                    console.log("Token Expirado!")
                    return navigate('/')
                }
            });
        //buscar tabela de preços
        console.log("buscar tabela de preços")
        axios
            .get(`${urlBase}/price`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    console.log("Preço: ", response.data)
                    setPrice(response.data)
                }
            })
            .catch(function (error) {
                console.log("Error: ", error.config.headers.Authorization);
                if (error.config.headers.Authorization !== null) {
                    console.log("Token Expirado!")
                    return navigate('/')
                }
            });
        //bucar data para referência
        console.log("buscar data para referência")
        const data = new Date().getMonth() + "-" + new Date().getFullYear()
        console.log("data: ", data)
        //conferir se no banco já tem a referência
        console.log("conferir se no banco já tem a referência")
        axios
            .get(`${urlBase}/invoice/reference/${data}`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    console.log("referência: ", response.data)
                    if(response.data.length > 0 && typeof(response.data) != "string"){
                        setReference(true)
                    }else{
                        setReference(false)
                        newInvoices(false)
                    }
                }
            })
            .catch(function (error) {
                console.log("Error: ", error.config.headers.Authorization);
                if (error.config.headers.Authorization !== null) {
                    console.log("Token Expirado!")
                    return navigate('/')
                }
            });
    }

    const newInvoices = (isReference) => {
         //gerar boleto
         console.log("gerar boleto")
         if(isReference){
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
                        console.log("apenas response: ", response)
                        if (response.status == 200) {
                            // setData(response);
                            // console.log(response);
                            dataStored.push(response.data)
                          }
                    })
                    .catch((e) => {
                        console.log("Erro ao criar os boletos", e)
                    })
                console.log(`Data ${data} to insert in reference ${currentReference}`)
            });
            
            console.log(dataStored)
            console.log("gerou os boletos", reference)

         }else{
            alert("para essa referência já há faturas!")
         }

    }

    const navStore = () => {
        return navigate('/store')
    }

    return (
        <MainCard xs={8} title="Administração">
            <Button onClick={() => generateInvoices()}>Gerar faturas</Button>
            <Button onClick={() => navStore()}>Lojas</Button>
        </MainCard>
    )
}

export default Adm 