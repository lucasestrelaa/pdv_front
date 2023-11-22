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
    const [users, setUsers] = useState([])
    const [price, setPrice] = useState([])
    const [reference, setReference] = useState(true)


    const generateInvoices = () => {
        //buscar usuários e a id tabela de preço
        console.log("buscar todos os usuários")
        axios
            .get(`${urlBase}/user`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    console.log("Usuários: ", response.data)
                    setUsers(response.data)
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
        const data = new Date().getMonth() + "/" + new Date().getFullYear()
        console.log("data: ", data)
        //conferir se no banco já tem a referência
        console.log("conferir se no banco já tem a referência")
        axios
            .get(`${urlBase}/reference/${data}`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    console.log("referência: ", response.data)
                    if(response.data.length > 0){
                        setReference(true)
                    }else{
                        setReference(false)
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
        //gerar boleto
        console.log("gerar boleto")
        if(reference){
            console.log("gerou os boletos")
        }
        //salvar no banco
        console.log("salvar no banco")

        //dados geral
        console.log(users, price)
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