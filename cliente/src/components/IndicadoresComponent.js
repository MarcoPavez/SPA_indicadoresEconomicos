import React, { useEffect, useState } from "react";
import axios from "axios";

const IndicadoresComponent = () => {
  const [datosServidor, setDatosServidor] = useState();
  const [fecha, setFecha] = useState("");
  const [indicador, setIndicadorSeleccionado] = useState();

  /* const TransformarFecha = useCallback((fecha) => {
    setFecha((fecha) => {
      var d = new Date(fecha),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("-");
    });
  }); */

  const TraerDatos = () => {
    const options = {
      method: "get",
      url: "http://localhost:5000/" + indicador + "/" + fecha,
    };
    axios.request(options).then((response) => {
      console.log(response.data);
      setDatosServidor(response.data);
    });
  };

  useEffect(() => {
    if (indicador) TraerDatos();
  }, [indicador]);

  

  return (
    <div>
      <h1 className="selectorIndicador">Indicadores económicos</h1>
      <div>
        <label>
          Selecciona una fecha:
          <input
            type="date"
            formTarget="dd-mm-yyyy"
            value={fecha}
            onChange={(ff) => setFecha(ff.target.value)}
          ></input>
        </label>
      </div>

      <label>
        Selecciona un indicador
        <select
          name="indicadores"
          id="indicadores"
          value={indicador}
          onChange={(e) => setIndicadorSeleccionado(e.target.value)}
        >
          <option value={null}>Selecciona un indicador</option>
          <option value="uf">Unidad de Fomento</option>
          <option value="ivp">Índice de valor promedio</option>
          <option value="dolar">Dólar observado</option>
          <option value="dolar_intercambio">Dólar acuerdo</option>
          <option value="euro">Euro</option>
          <option value="ipc">Indice de Precios al Consumidor (IPC)</option>
          <option value="utm">Unidad Tributaria Mensual (UTM)</option>
          <option value="imacec">
            Índice Mensual de Actividad Económica (Imacec)
          </option>
          <option value="tpm">Tasa Política Monetaria (TPM)</option>
          <option value="libra_cobre">Libra de Cobre</option>
          <option value="tasa_desempleo">Tasa de desempleo</option>
        </select>
      </label>

      <button type="submit">Submit</button>

      {indicador && fecha && datosServidor && (
        <div className="valorIndicador">
          <h1> Indicador Seleccionado : {indicador}</h1>

          <h3>Valor del indicador: {console.log(datosServidor)}</h3>
        </div>
      )}
    </div>
  );
};

export default IndicadoresComponent;
