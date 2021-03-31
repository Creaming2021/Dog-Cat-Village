import React from 'react';
import styles from './adoptedAnimalsChart.module.css';
import { Bar } from 'react-chartjs-2';

const AdoptedAnimalsChart = () => {
  
  return (
    <div className={styles['chart-container']}>
      <div className={styles['year-box']}>
        <button className={styles['year-btn']}>◀</button>
        <p className={styles['year-text']}>2021</p>
        <button className={styles['year-btn']}>▶</button>
      </div>
      <div className={styles['chart-box']}>
        <Bar
          data={{
            labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            datasets: [
              {
                label: '올해 입양된 동물',
                data: [10, 12, 33, 3, 4, 3, 24, 6, 3, 10, 14, 8],
                backgroundColor: [
                  'rgba(81, 70, 240, 0.2)',
                ],
                borderColor: [
                  'rgb(81, 70, 240)',
                ],
                borderWidth: 1,
              },
              {
                label: '작년 입양된 동물',
                data: [3, 14, 23, 5, 8, 6, 2, 26, 13, 1, 4, 15],
                backgroundColor: [
                  'rgba(217, 63, 122, 0.2)',
                ],
                borderColor: [
                  'rgb(217, 63, 122)',
                ],
                borderWidth: 1,
              },
            ]
          }}
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
    </div>
  );
}

export default AdoptedAnimalsChart;