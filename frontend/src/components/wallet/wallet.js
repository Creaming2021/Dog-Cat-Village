import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './wallet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

const Wallet = () => {
  const [ myWallet, setMyWallet ] = useState({
    address: '0x553e6f207305C348188DA38E58A1C28d77A66271',
    addressShort: '0x553e6f',
    coin: '',
  });

  useEffect(() => {
    axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x0B21843cdf103F67a513c001e02606ba2384a650&address=${myWallet.address}&tag=latest&apikey=6QMEM9F74YBT8WM8E1I8W5XGE4G7GT824M`)
    .then( ({data}) => {
      setMyWallet({ ...myWallet, coin: data.result.substring(0, data.result.length - 5)});
    })
  }, []);

  useEffect(() => {

  });

  return (
    <div className={styles.wallet}>
      <h1 className={styles['wallet-title']}>내 지갑</h1>
      <div className={styles.hashnumber}>{myWallet.address}</div>
      <div className={styles['coin-container']}>
        <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']} />
        <div className={styles.coin}>{myWallet.coin}</div>
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