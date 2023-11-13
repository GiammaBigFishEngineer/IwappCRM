import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AeroChart = ({ labels, data }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chartConfig = {
        type: 'polarArea',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'AeroGramma',
              data: data,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FFA500'
              ]
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
  }, [chartContainer, labels, data]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default AeroChart;