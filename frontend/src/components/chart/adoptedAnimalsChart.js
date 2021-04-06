import React, { useEffect, useState } from 'react';
import styles from './adoptedAnimalsChart.module.css';
import { Bar } from 'react-chartjs-2';
import { basic } from '../../service/instance';



const AdoptedAnimalsChart = () => {
  const [year, setYear] = useState(2021);
  const [monthlyAdoption, setMonthlyAdoption] = useState([]);
  const [lastMonthlyAdoption, setLastMonthlyAdoption] = useState([]);

  useEffect(() => {
    setYear(new Date(Date.now()).getFullYear());
    basic.get(`/adopts/years/${year}/count`)
      .then(res => {
        setMonthlyAdoption(res.data.monthlyAdoption);
      });
    basic.get(`/adopts/years/${year - 1}/count`)
      .then(res => {
        setLastMonthlyAdoption(res.data.monthlyAdoption);
      });
  }, []);

  const decreaseYear = () => {
    basic.get(`/adopts/years/${year - 2}/count`)
      .then(res => {
        setMonthlyAdoption(lastMonthlyAdoption);
        setLastMonthlyAdoption(res.data.monthlyAdoption);
      })
      .catch()
    setYear(year - 1)
  };

  const increaseYear = () => {
    basic.get(`/adopts/years/${year + 1}/count`)
      .then(res => {
        setLastMonthlyAdoption(monthlyAdoption);
        setMonthlyAdoption(res.data.monthlyAdoption);
      })
      .catch()
    setYear(year + 1)
  };

  const barData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '올해 입양된 동물',
        data: monthlyAdoption,
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
        data: lastMonthlyAdoption,
        backgroundColor: [
          'rgba(217, 63, 122, 0.2)',
        ],
        borderColor: [
          'rgb(217, 63, 122)',
        ],
        borderWidth: 1,
      },
    ]
  };
  
  const barOptions = {
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
  };

  return (
    <div className={styles['chart-container']}>
      <div className={styles['year-box']}>
        <button className={styles['year-btn']} onClick={decreaseYear}>◀</button>
        <p className={styles['year-text']}>{year}</p>
        <button className={styles['year-btn']} onClick={increaseYear}>▶</button>
      </div>
      <div className={styles['chart-box']}>
        <Bar
          data={barData}
          options={barOptions}
        />
      </div>
    </div>
  );
}

export default AdoptedAnimalsChart;