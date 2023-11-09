import axios from "axios";

const { Button } = require("@mui/material")
const { default: MainCard } = require("ui-component/cards/MainCard")

const Adm = () => {
    // const id_store = sessionStorage.getItem('id_store');
    const token = sessionStorage.getItem('authorization');
    const urlBase = sessionStorage.getItem('UrlBase');

    const generateInvoices = () => {
        //buscar usuários e a id tabela de preço
        console.log("buscar todos os usuários")
        axios
            .get(`${urlBase}/user`, { headers: { Authorization: token } })
            .then(function (response) {
                if (response.status == 200) {
                    console.log("Usuários: ", response.data)
                    //response.data.map((res) => {
                        //productsQnt.push({ ...res, quantidade: 0 })
                    //})
                    //setData(productsQnt);
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
        //bucar data para referência
        console.log("bucar data para referência")
        //conferir se no banco já tem a referência
        console.log("conferir se no banco já tem a referência")
        //gerar boleto
        console.log("gerar boleto")
        //salvar no banco
        console.log("salvar no banco")
    }

    return (
        <MainCard xs={8} title="Administração">
            <Button onClick={() => generateInvoices()}>Gerar faturas</Button>
        </MainCard>
    )
}

export default Adm 