import React from 'react';
import styles from './donationList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DonationListItem from './donationListItem';


const date = new Date().toDateString();

const DonationDataList = [
  {
    img: "https://picsum.photos/60/60",
    amount: "+1000 마블",
    transcation: "동렬 아저씨의 동물농장",
    balance : "잔액 10 마블",
    date
  },
  {
    img: "https://picsum.photos/61/60",
    amount: "-1000 마블",
    transcation: "고양이 아저씨",
    balance : "잔액 150 마블",
    date
  },
  {
    img: "https://picsum.photos/60/61",
    amount: "+1000 마블",
    transcation: "몽키맨",
    balance : "잔액 130 마블",
    date
  },
  {
    img: "https://picsum.photos/61/61",
    amount: "-1000 마블",
    transcation: "피기피기",
    balance : "잔액 102 마블",
    date
  },
  {
    img: "https://picsum.photos/62/60",
    amount: "+1000 마블",
    transcation: "동렬 아저씨의 동물농장",
    balance : "잔액 10 마블",
    date
  },
  {
    img: "https://picsum.photos/60/62",
    amount: "-1000 마블",
    transcation: "마지막 블록체인",
    balance : "잔액 275 마블",
    date
  },
  {
    img: "https://picsum.photos/61/61",
    amount: "+1000 마블",
    transcation: "어벤져스",
    balance : "잔액 1100 마블",
    date
  },
  {
    img: "https://picsum.photos/61/62",
    amount: "-1000 마블",
    transcation: "토니토니",
    balance : "잔액 100 마블",
    date
  }
]


function DonationList() {
  return (
    <>
      <div className={styles['donation-container']}>
        <div className={styles['search-container']}>
          <select name="options" className={styles.options}>
            <option value="all">모두</option>
            <option value="charge">충전</option>
            <option value="donate">기부</option>
          </select>
          <input type="search" placeholder="보호소 명" className={styles['search-box']} />
          <FontAwesomeIcon icon={faSearch} className={styles['search-icon']} />
        </div>
        <div className={styles['list-container']}>
          <div className={styles['date-filter']}>
            <button className={styles['left-btn']}>◀</button>
            <p className={styles.date}>2021.03</p>
            <button className={styles['right-btn']}>▶</button>
          </div>
          {
            DonationDataList.map((data) => {
              return (
                <>
                  <hr className={styles.['list-line']}/>
                  <DonationListItem data={data} />
                </>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default DonationList;

