import React, { useEffect, useState } from 'react'
import axios from 'axios'

const datoInicial = {
    codigo: "",
    fecha: "",
    nombre: "",
    unidad_medida: "",
    valor: ""
}

const IndicadoresComponent = () => {
    const [datosServidor, setDatosServidor] = useState(datoInicial)
    const [indicador, setIndicadorSeleccionado] = useState()


    const TraerDatos = () => {
        const options = {
            method: 'GET',
            url: "http://localhost:5000/indicadores/",
            params: { indicadorr: indicador }
        }
        axios.request(options)
            .then((response) => {
                console.log(response.data)
                setDatosServidor(response.data)
            })
    }


    /*  console.log(Object.keys(datosServidor).
         filter((key) => key.includes('uf')).
         reduce((cur, key) => { return Object.assign(cur, { [key]: datosServidor[key] }) }, {}));
  */

    useEffect(() => {
        if (indicador) TraerDatos()
    }, [indicador])



    return (

        <div>

            {!indicador && <div>


                <h1 className="selectorIndicador">Indicadores económicos</h1>
                <select
                    name='indicadores'
                    id="indicadores" value={indicador}
                    onChange={(e) => setIndicadorSeleccionado(e.target.value)}>
                    <option value={null}>Selecciona un indicador</option>
                    <option value="uf">Unidad de Fomento</option>
                    <option value="ivp">Índice de valor promedio</option>
                    <option value="dolar">Dólar observado</option>
                    <option value="dolar_intercambio">Dólar acuerdo</option>
                    <option value="euro">Euro</option>
                    <option value="ipc">Indice de Precios al Consumidor (IPC)</option>
                    <option value="utm">Unidad Tributaria Mensual (UTM)</option>
                    <option value="imacec">Índice Mensual de Actividad Económica (Imacec)</option>
                    <option value="tpm">Tasa Política Monetaria (TPM)</option>
                    <option value="libra_cobre">Libra de Cobre</option>
                    <option value="tasa_desempleo">Tasa de desempleo</option>
                </select>
            </div>}

            {indicador && datosServidor && <div className='valorIndicador'>
                <h1> Indicador Seleccionado : {indicador}</h1>


                <h3> {
                    Object.entries(datosServidor)
                        .filter(([key, value]) => key.includes(indicador))
                        .map(llaveFiltrada => (<p key={llaveFiltrada}>Valor del indicador: {llaveFiltrada[1].valor}</p>))
                }</h3>
            </div>}



        </div>


    )

}


export default IndicadoresComponent;








