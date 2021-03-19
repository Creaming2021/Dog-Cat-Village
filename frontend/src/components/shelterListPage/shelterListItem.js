import React from 'react';
import styles from './shelterListItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const ShelterListItem = ({data}) => {
  return (
    <div className={styles['shelter-container']}>
      <div className={styles['img-container']}>
        <img src={data.img} className={styles['shelter-img']}/>
        <div className={styles['shelter-intro-container']}>
          <h4 className={styles['shelter-introduction']}>
            {data.introduction}
          </h4>
        </div>
      </div>
      <div className={styles['shelter-donated-container']}>
        <div className={styles['amount-container']}>
          <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']}/>
          <div className={styles.amount}>{data.amount}</div>
        </div>
        <div className={styles['viewer-container']}>
          <FontAwesomeIcon icon={faUserCircle} className={styles['user-icon']}/>
          <div className={styles.viewer}>{data.viewer}</div>
        </div>
      </div>
      <h3 className={styles['shelter-name']}>{data.shelterName}</h3>
    </div>
  );
};

export default ShelterListItem;