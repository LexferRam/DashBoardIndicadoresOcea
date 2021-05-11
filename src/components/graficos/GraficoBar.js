import Chart from "react-google-charts";
import React, { useEffect, useState } from "react";
// import "../../css/Tabs.css";

function App({ enviardataGraph, valor, enviardataGrid }) {
  const [json, setJson] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {

    if (valor === "Recaudo de Divisas en Efectivo") {
      const chartData = [['OFICINA', 'MTO_MONEDA', { role: 'style', format: 'currency' }, { sourceColumn: 2, role: 'annotation', type: 'number', calc: 'stringify' }]]
      for (let i = 0; i < enviardataGraph.length; i += 1) {
        chartData.push([enviardataGraph[i].OFICINA, enviardataGraph[i].MTO_MONEDA, 'fill-color:#47c0b6;stroke-color: blue;stroke-width: 2 ', enviardataGraph[i].MTO_MONEDA])
      }
      setJson(chartData);
    } else if (valor === "Recaudación Divisas-Efectivo-Sobrantes") {
      const chartData = [['OFICINA', 'MTO_SOBRANTE', { role: 'style' }, { sourceColumn: 2, role: 'annotation', type: 'number', calc: 'stringify', }]]
      for (let i = 0; i < enviardataGraph.length; i += 1) {
        chartData.push([enviardataGraph[i].OFICINA, enviardataGraph[i].MTO_SOBRANTE, 'fill-color:#47c0b6;stroke-color: blue;stroke-width: 2 ', enviardataGraph[i].MTO_SOBRANTE])
      }
      setJson(chartData);
      setTitle(valor)
    }
    else if (valor === "Recaudación Divisas - Efectivo - Faltantes") {
      const chartData = [['OFICINA', 'MTO_FALTANTE', { role: 'style' }, { sourceColumn: 2, role: 'annotation', type: 'number', calc: 'stringify', }]]
      for (let i = 0; i < enviardataGraph.length; i += 1) {
        chartData.push([enviardataGraph[i].OFICINA, enviardataGraph[i].MTO_FALTANTE, 'fill-color:#47c0b6;stroke-color: blue;stroke-width: 2 ', enviardataGraph[i].MTO_FALTANTE])
      }
      setJson(chartData);
    }
    else if (valor === "Efectivo / Sobrantes / Faltantes") {
      const chartData = [
        ['OFICINA', 'MTO_MONEDA', 'MTO_SOBRANTE', 'MTO_FALTANTE',
          // { role: 'style' }, 
          // { role: 'style' }, 
          // { role: 'style' }, 
          // {sourceColumn: 2, role: 'annotation', type: 'number', calc: 'stringify',},
          // {sourceColumn: 2, role: 'annotation', type: 'number', calc: 'stringify',},
          // {sourceColumn: 2, role: 'annotation', type: 'number', calc: 'stringify',},
        ]
      ]
      // alert(JSON.stringify(enviardataGraph))
      for (let i = 0; i < enviardataGrid.length; i += 1) {
        chartData.push([
          enviardataGrid[i].OFICINA,
          enviardataGrid[i].MTO_MONEDA,
          enviardataGrid[i].MTO_SOBRANTE,
          enviardataGrid[i].MTO_FALTANTE,
          // ,'fill-color:#ff9100;stroke-color: #e65100;stroke-width: 2 ',
          // ,'fill-color:#ff9100;stroke-color: #e65100;stroke-width: 2 ',
          // ,'fill-color:#ff9100;stroke-color: #e65100;stroke-width: 2 ',
          // enviardataGrid[i].MTO_MONEDA,
          // enviardataGrid[i].MTO_SOBRANTE, 
          // enviardataGrid[i].MTO_FALTANTE
        ])
      }
      setJson(chartData);
    }

  }, [enviardataGraph])
  return (
    <div style={{ marginTop: -10 }}>
      {/* {valor === "Recaudo de Divisas en Efectivo" ? (
        <>
          <b>{valor}</b> 
        </>
      ) : valor === "Recaudación Divisas-Efectivo-Sobrantes" ? (
        <>
          <b>{valor}</b> 
        </>
      ): valor === "Recaudación Divisas - Efectivo - Faltantes" ? (
        <>
          <b>{valor}</b>
        </>
      ): valor === "Efectivo / Sobrantes / Faltantes" ? (
        <>
          <b>{valor}</b>
        </>
      ): (
            <>
              <b></b> 
            </>
          )
      }  */}
      {valor === "Efectivo / Sobrantes / Faltantes" ? (
        <>
          <div style={{ marginLeft: '0px' }}>
            {/* <Chart
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Cargando Gráfica...</div>}
            data={json}
              // [
              //   ['', 'Mto. Moneda', 'Faltante', 'Sobrante'],
              //   ['', 1000, 400, 200]
              // ]
              options={{
                // Material design options
                chart: {
                  title: 'Efectivo / Sobrantes / Faltantes',
                  // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                },
                hAxis: {
                  title: 'MONTO DIVISAS',
                  titleTextStyle: { color: '#dd2c00', fontSize: 16, fontStyle: 'normal', italic: "false" },
                  textStyle: {
                    fontSize: 10
                  },
                  minValue: 0,
                },
                vAxis: {
                  // title: 'OFICINAS',
                  format: 'currency',
                  textStyle: {
                    fontSize: 10
                  },
                  titleTextStyle: { color: '#dd2c00', fontSize: 16, italic: "false" },

                }
              }}
            />  */}
            <Chart
              width={'100%'}
              chartLanguage="es"
              height={'500px'}
              chartType="BarChart"
              loader={<div>Cargando Gráfica...</div>}
              data={json}
              options={{
                legend: { position: "none" },
                title: 'Efectivo / Sobrantes / Faltantes',
                chartArea: { width: '70%',//65%
                backgroundColor: '#eceff1'  },
                hAxis: {
                  title: 'Monto $',
                  minValue: 0,
                  textStyle: {
                    fontSize: 9
                  },
                },
                vAxis: {
                  title: 'Sucursal',
                  textStyle: {
                    fontSize: 9
                  },
                },
              }}
              // For tests
              rootProps={{ 'data-testid': '1' }}
            />
          </div>

        </>
      ) : (
        <>
          <Chart
            width={'100%'}//50%
            //height={'800px'}//800px
            chartLanguage="es"
            chartType="BarChart"
            loader={<div>Cargando Gráfica...</div>}
            data={json}

            options={{
              width: "100%",//750
              height: 500,//800
              title: { title },
              titleTextStyle: { color: '#455a64', fontSize: 18, float: 'right' },
              is3D: 'true',
              chartArea: { 
                width: '70%', //65%
                backgroundColor: '#eceff1' 
              },
              legend: { position: "none" },
              hAxis: {
                title: 'MONTO DIVISAS',
                titleTextStyle: { color: '#dd2c00', fontSize: 16, fontStyle: 'normal', italic: "false" },
                textStyle: {
                  fontSize: 10
                },
                minValue: 0,
              },
              vAxis: {
                title: 'OFICINAS',
                format: 'currency',
                textStyle: {
                  fontSize: 10
                },
                titleTextStyle: { color: '#dd2c00', fontSize: 16, italic: "false" },
                gridlines: { count: 12 }
              },
            }}
            // For tests
            rootProps={{ 'data-testid': '1' }}
          />
        </>

      )}
    </div>
  );
}

export default App;


