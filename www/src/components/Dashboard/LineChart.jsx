import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chartConfig = {
        type: 'line',
        data: {
          labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
          datasets: [
            {
              label: 'Valori mensili',
              data: data,
              borderColor: 'rgb(75, 192, 192)',
              fill: false
            }
          ]
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
        }
      };

      const chart = new Chart(chartContainer.current, chartConfig);
      return () => {
        chart.destroy();
      }
    }
  }, [chartContainer, data]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default LineChart;