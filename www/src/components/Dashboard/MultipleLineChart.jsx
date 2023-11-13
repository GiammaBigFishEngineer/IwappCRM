import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

function MultipleLineChart({ data }) {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // distruggiamo il grafico esistente
      }
  
      // creiamo un nuovo grafico
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
          datasets: data.map(({ agent, sales }) => {
            return {
              label: agent,
              data: sales,
              borderColor: randomColor(),
              fill: false,
            };
          }),
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        },
      });
    }, [data]);
  
    return <canvas ref={chartContainer} />;
  };
  
  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  

export default MultipleLineChart;