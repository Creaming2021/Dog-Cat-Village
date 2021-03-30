import React from 'react';
import styles from './contributionChart.module.css';
import { Line } from 'react-chartjs-2';

const ContributionChart = () => {
  
  return (
    <div className={styles.chart}>
      <Line
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

export default ContributionChart;
