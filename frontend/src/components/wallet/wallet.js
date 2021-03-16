import React from 'react';
import styles from './wallet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from "@fortawesome/free-solid-svg-icons";

function Wallet() {
  return (
    <div className={styles.wallet}>
      <h1 className={styles['wallet-title']}>내 지갑</h1>
      <div className={styles.hashnumber}>1x0123456789</div>
      <div className={styles['coin-container']}>
        <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']} />
        <div className={styles.coin}>100</div>
      </div>
      <div className={styles['coin-btns']}>
        <button className={styles['coin-charge-btn']}>충전하기</button> 
        <div className={styles['division-line']}>ㅣ</div>
        <button className={styles['coin-withdraw-btn']}>출금하기</button>
      </div>
    </div>
  );
};

export default Wallet;