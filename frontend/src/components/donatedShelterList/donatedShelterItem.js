import React from 'react';
import styles from './donatedShelterItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from "@fortawesome/free-solid-svg-icons";

function DonatedShelterItem({ data }) {
  return (
    <div className={styles['items-container']}>
      <div className={styles['item-box']}>
        <img src={data.img} className={styles['item-img']}/>
        <div className={styles['item-description']}>
          <h4 className={styles['item-sheltername']}>{data.shelterName}</h4>
          <h5 className={styles['item-date']}>{data.date}</h5>
          <div className={styles['item-amount-container']}>
            <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']} />
            <h6 className={styles['item-amount']}>{data.amount}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DonatedShelterItem;  