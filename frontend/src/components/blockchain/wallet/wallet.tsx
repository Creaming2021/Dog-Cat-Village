import React, { useState, useEffect } from 'react';
import styles from './wallet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import * as BlockChainAPI from '../../../service/blockchainAPI';
import { WalletType } from '../../../interface/blockchain';

type WalletProps = {
  wallet: WalletType,
  
}

const Wallet = ({ wallet }: WalletProps ) => {
  type myWalletType = {
    address: string,
    addressShort: string,
    coin: number,
  }

  const [ myWallet, setMyWallet ] = useState<myWalletType>({
    address: wallet.address,
    addressShort: wallet.address.substring(0, 7),
    coin: 0
  });

  useEffect(() => {
    getTokenBalance();
  }, []);

  const getTokenBalance = () => {
    BlockChainAPI.getTokenBalance(myWallet.address)
    .then(( data: number ) => {
      setMyWallet({ ...myWallet, coin: data});
    })
  };

  

  
  const toAddress = '0x1AeE84790f75F4EbB3A769746de6642a0bd4C9e1';
  const privateKey = 'cf61f430c051df6dc8d650d7a65c95a15b6a1a1df685785e3d75096964836585';

  const onClick = () => {
    BlockChainAPI.sendTransaction({
      fromAddress: myWallet.address,
      toAddress,
      amount: 0.9,
      privateKey,
    });
  }

  const onClickCharge = () => {
  }

  const onClickWithdraw = () => {

  }

  const onClose = () => {

  }

  return (
    <>
      <div className={styles.wallet}>
        <h1 className={styles['wallet-title']}>내 지갑</h1>
        <div className={styles.hashnumber}>{myWallet.address}</div>
        <div className={styles['coin-container']}>
          <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']} />
          <div className={styles.coin}>{myWallet.coin}</div>
        </div>
        <div className={styles['coin-btns']}>
          <button className={styles['coin-charge-btn']} onClick={onClickCharge}>충전하기</button> 
          <div className={styles['division-line']}>ㅣ</div>
          <button className={styles['coin-withdraw-btn']} onClick={onClickWithdraw}>출금하기</button>
        </div>
      </div>
      {}
    </>
  );
};

export default Wallet;