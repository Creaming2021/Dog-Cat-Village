import React from 'react';
import styles from './adoptedAnimalsChart.module.css';
import { Bar } from 'react-chartjs-2';

const AdoptedAnimalsChart = () => {
  
  return (
    <div className={styles.chart}>
      <Bar
        data={{
          labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          datasets: [
            {
              label: '올해',
              data: [10, 12, 33, 3, 4, 3, 24, 6, 3, 10, 14, 8],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                'red',
              ],
              borderWidth: 1,
            },
            {
              label: '작년',
              data: [3, 14, 23, 5, 8, 6, 2, 26, 13, 1, 4, 15],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            },
          ]
        }}
        height={300}
        width={500}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}

      />
    </div>
  );
}

export default AdoptedAnimalsChart;