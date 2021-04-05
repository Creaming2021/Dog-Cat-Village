import React from 'react';
import styles from './donatedShelterItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { DonatedShelterType } from '../../interface/shleter';

type DonatedShleterItemProps = {
  shelter: DonatedShelterType,
}

const DonatedShelterItem = ({ shelter }: DonatedShleterItemProps) => {
  return (
    <div className={styles['items-container']}>
      <div className={styles['item-box']}>
        <img src={shelter.profileImage} className={styles['item-img']}/>
        <div className={styles['item-description']}>
          <h4 className={styles['item-shelter-name']}>{shelter.name}</h4>
          <h5 className={styles['item-date']}>{shelter.time}</h5>
          <div className={styles['item-amount-container']}>
            <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']} />
            <h6 className={styles['item-amount']}>{shelter.value}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DonatedShelterItem;  