const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const fetch = (...args) => 
import('node-fetch').then(({default:fetch}) => fetch(...args))


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



/* app.get("/:indicadorr", (req, res) => {
    console.log(req)
    const {indicadorr} = req.query.tipo_indicador
    const fecha = req.query.fechaa

    const options = {
        method: 'get',
        url:`https://mindicador.cl`,
        baseURL:`/api`+`/${indicadorr}`
    

    }
    axios.request(options)
        .then(response => {
            res.json(response.data)
        })

}) */



app.get('/:tipoIndicador/:fecha', async(req,res) => {

    const {tipoIndicador} = req.params
    const {fecha} = req.params

    const respuestaApi = await fetch(
        'https://mindicador.cl/api/'+tipoIndicador+"/"+fecha
    )

    const respuestaApiJson = await respuestaApi.json()
    res.send(respuestaApiJson)

})


app.listen(5000, () => {
    console.log("¡Servidor conectado exitosamente en el puerto 5000!")
})


