import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const BarChart = ({ values, names }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chartConfig = {
        type: 'bar',
        data: {
          labels: names,
          datasets: [
            {
              label: 'Valori',
              data: values,
              backgroundColor: 'rgb(75, 192, 192)',
              borderWidth: 1
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
  }, [chartContainer, values, names]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default BarChart;