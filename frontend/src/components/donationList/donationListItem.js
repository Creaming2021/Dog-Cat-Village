import React from 'react';
import styles from './donationListItem.module.css';

const DonationListItem = ({ data }) => {
  return (
    <div className={styles['item-box']}>
      <img src={data.img} className={styles['item-img']} />
      <div className={styles['middle-box']}>
        <div className={styles['item-amount']} >{data.amount}</div>
        <div className={styles['item-transcation']} >{data.name}</div>
      </div>
      <div className={styles['right-box']}>
        <div className={styles['item-balance']} >{data.balance}</div>
        <div className={styles['item-date']}>{data.date}</div>
      </div>
    </div>
  );
};


export default DonationListItem;