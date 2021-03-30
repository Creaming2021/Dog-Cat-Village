import React, { useState } from 'react';
import styles from './donatedShelterList.module.css';
import DonatedShelterItem from './donatedShelterItem';

const donatedShelterDataList = [
  {
    img: "https://picsum.photos/620/201",
    shelterName: "동렬 아저씨의 동물농장",
    date: "2021.02.01",
    amount: "1000"
  },
  {
    img: "https://picsum.photos/621/200",
    shelterName: "해피 도그",
    date: "2022.03.10",
    amount: "2000"
  },
  {
    img: "https://picsum.photos/620/202",
    shelterName: "캣 하우스",
    date: "2024.11.10",
    amount: "3000"
  },
  {
    img: "https://picsum.photos/621/201",
    shelterName: "몽키 몽키",
    date: "2027.07.24",
    amount: "240"
  },
  {
    img: "https://picsum.photos/621/202",
    shelterName: "돼지 피그",
    date: "2021.03.21",
    amount: "7600"
  }
]


const DonatedShelterList = ({ userTypeBoolean }) => {
  const [choicedList, setChoicedList] = useState(true);

  const btnActiveController = () => {
    setChoicedList(!choicedList);
  }

  return (
    <>
      <div className={styles['list-out-container']}>
        <div className={styles['btn-container']}>
          <button 
            className={`${styles['tab-btn']} ${choicedList && userTypeBoolean && styles['btn-active']} ${!userTypeBoolean && styles['blue-tab-btn']} ${choicedList && !userTypeBoolean && styles['blue-btn-active']}`}
            onClick={btnActiveController}
          >
            후원한 보호소
          </button>
          <button 
            className={`${styles['tab-btn']} ${!choicedList && userTypeBoolean && styles['btn-active']} ${!userTypeBoolean && styles['blue-tab-btn']} ${!choicedList && !userTypeBoolean && styles['blue-btn-active']}`}
            onClick={btnActiveController}
          >
            입양 신청
          </button>
        </div>
        <div className={styles['list-container']}>
          {
            donatedShelterDataList.map((data) => {
              return <DonatedShelterItem data={data} />;
            })
          }
        </div>
      </div>
    </>
  );
};

export default DonatedShelterList;