import React from 'react';
import styles from './contributionChart.module.css';
import { Line } from 'react-chartjs-2';

const ContributionChart = () => {
  
  const lineData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '올해 기부금액',
        data: [10, 12, 33, 3, 4, 3, 24, 6, 3, 10, 14, 8],
        backgroundColor: [
          'rgba(142, 194, 45, 0.2)',
        ],
        borderColor: [
          'rgba(142, 194, 45)',
        ],
        borderWidth: 1,
        lineTension: 0,
      },
    ]
  }

  const lineOptions = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        { 
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  return (
    <div className={styles['chart-container']}>
      <div className={styles['year-box']}>
        <button className={styles['year-btn']}>◀</button>
        <p className={styles['year-text']}>2021</p>
        <button className={styles['year-btn']}>▶</button>
      </div>
      <div className={styles['chart-box']}>
        <Line
          data={lineData}
          options={lineOptions}

        />
      </div>
    </div>
  );
}

export default ContributionChart;
