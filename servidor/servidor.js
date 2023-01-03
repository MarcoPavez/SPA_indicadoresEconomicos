const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')

const app = express()



const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}

app.use(cors(
    config.application.cors.server
));



app.get(`/indicadores`, (req, res) => {
    console.log(req)
    const indicador = req.params.indicadorr

    const options = {
        method: 'GET',
        url: `https://mindicador.cl/api`,
        params:{indicadorr:indicador}

    }
    axios.request(options)
        .then(response => {
            res.json(response.data)
        })

})


app.listen(5000, () => {
    console.log("¡Servidor conectado exitosamente en el puerto 5000!")
})


