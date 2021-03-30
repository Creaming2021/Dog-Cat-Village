import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './wallet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import * as BlockChainAPI from '../../service/blockchain';

const Wallet = () => {
  const [ myWallet, setMyWallet ] = useState({
    address: '0xA9e4f0d5332b26C9B323cC299604D001dA25db1B',
    //address: '0x1AeE84790f75F4EbB3A769746de6642a0bd4C9e1',
    addressShort: '0x553e6f',
    coin: '',
  });

  const toAddress = '0x1AeE84790f75F4EbB3A769746de6642a0bd4C9e1';
  //const toAddress = '0xA9e4f0d5332b26C9B323cC299604D001dA25db1B';
  const privateKey = 'cf61f430c051df6dc8d650d7a65c95a15b6a1a1df685785e3d75096964836585';

  useEffect(() => {
    getTokenBalance();
  }, []);

  const getTokenBalance = () => {
    BlockChainAPI.getTokenBalance(myWallet.address)
    .then( ( data ) => {
      setMyWallet({ ...myWallet, coin: data});
    })
  };

  const onClick = () => {
    BlockChainAPI.sendTransaction({
      fromAddress: myWallet.address,
      toAddress,
      amount: 0.9,
      privateKey,
    });
  }

  return (
    <div className={styles.wallet}>
      <h1 className={styles['wallet-title']}>내 지갑</h1>
      <div className={styles.hashnumber}>{myWallet.address}</div>
      <div className={styles['coin-container']}>
        <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']} />
        <div className={styles.coin}>{myWallet.coin}</div>
      </div>
      <div className={styles['coin-btns']}>
        <button className={styles['coin-charge-btn']} onClick={getTokenBalance}>충전하기</button> 
        <div className={styles['division-line']}>ㅣ</div>
        <button className={styles['coin-withdraw-btn']} onClick={onClick}>출금하기</button>
      </div>
    </div>
  );
};

export default Wallet;