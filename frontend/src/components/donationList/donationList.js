import React, { useState } from 'react';
import styles from './donationList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DonationListItem from './donationListItem';
import { Search } from '../common/common';


const date = new Date().toDateString();

const DonationDataList = [
  {
    id: "1",
    img: "https://picsum.photos/60/60",
    amount: "+1000 마블",
    transcation: "동렬 아저씨의 동물농장",
    balance : "잔액 10 마블",
    date
  },
  {
    id: "2",
    img: "https://picsum.photos/61/60",
    amount: "-1000 마블",
    transcation: "고양이 아저씨",
    balance : "잔액 150 마블",
    date
  },
  {
    id: "3",
    img: "https://picsum.photos/60/61",
    amount: "+1000 마블",
    transcation: "몽키맨",
    balance : "잔액 130 마블",
    date
  },
  { id: "4",
    img: "https://picsum.photos/61/61",
    amount: "-1000 마블",
    transcation: "피기피기",
    balance : "잔액 102 마블",
    date
  },
  {
    id: "5",
    img: "https://picsum.photos/62/60",
    amount: "+1000 마블",
    transcation: "동렬 아저씨의 동물농장",
    balance : "잔액 10 마블",
    date
  },
  {
    id: "6",
    img: "https://picsum.photos/60/62",
    amount: "-1000 마블",
    transcation: "마지막 블록체인",
    balance : "잔액 275 마블",
    date
  },
  {
    id: "7",
    img: "https://picsum.photos/61/61",
    amount: "+1000 마블",
    transcation: "어벤져스",
    balance : "잔액 1100 마블",
    date
  },
  {
    id: "8",
    img: "https://picsum.photos/61/62",
    amount: "-1000 마블",
    transcation: "토니토니",
    balance : "잔액 100 마블",
    date
  },
  {
    id: "9",
    img: "https://picsum.photos/62/61",
    amount: "+4070 마블",
    transcation: "제이",
    balance : "잔액 9900 마블",
    date
  }
]


const DonationList = () => {
  const [moreBtnState, setMoreBtnState] = useState(false);
  const [values, setValues] = useState({ type: 'all', input: '' });

  const controlMoreBtn = () => {
    setMoreBtnState(!moreBtnState);
    console.log(moreBtnState);
  };

  return (
    <>
      <div className={styles['donation-container']}>
        <div className={styles['search-container']}>
          <Search 
            selectList={[{name: 'type', options: [
              { value: "all", option: "모두" },
              { value: "charge", option: "충전" },
              { value: "donate", option: "기부" }
            ]}]}
            selectValue={values.first} 
            inputValue={values.input}
            inputName={'shelterInput'} 
            onSearch={()=>{
            }}
            onChange={(e) => {
            }}
            placeholder={'보호소 명'}
            inputSize={'input-large'}
          />
          {/* <select name="options" className={styles.options}>
            <option value="all">모두</option>
            <option value="charge">충전</option>
            <option value="donate">기부</option>
          </select>
          <input type="search" placeholder="보호소 명" className={styles['search-box']} />
          <FontAwesomeIcon icon={faSearch} className={styles['search-icon']} /> */}
        </div>
        <div className={styles['main-container']}>
          <div className={styles['date-filter']}>
            <button className={styles['left-btn']}>◀</button>
            <p className={styles.date}>2021.03</p>
            <button className={styles['right-btn']}>▶</button>
          </div>
          <div className={ moreBtnState === true ? `${styles['list-container']} ${styles['list-container-active']}` : styles['list-container']}>
            {
              DonationDataList.map((data) => {
                return (
                  <>
                    <hr className={styles['list-line']}/>
                    <DonationListItem data={data} key={data.id} />
                  </>
                )
              })
            }
          </div>
          <hr className={styles['list-line-last']}/>
          <div className={styles['more-btn-container']}>
            <button className={styles['more-btn']} onClick={controlMoreBtn}>+ 더보기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationList;

