import React, { useState, useEffect } from 'react';
import styles from './wallet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import * as BlockChainAPI from '../../../service/blockchainAPI';
import { WalletType } from '../../../interface/blockchain';
import { ModalMedium } from '../../common/common';
import Charge from '../charge/charge';
import Withraw from '../withraw/withraw';

type WalletProps = {
  wallet: WalletType,
  memberRole: string,
  onSubmitCharge: (amount: string) => void,
  onSubmigWithdraw: () => void,
}

const Wallet = ({ wallet, memberRole, onSubmitCharge, onSubmigWithdraw }: WalletProps ) => {
  const [ modal, setModal ] = useState<string>('');

  type myWalletType = {
    address: string,
    addressShort: string,
    coin: number,
  }

  const [ myWallet, setMyWallet ] = useState<myWalletType>({
    address: '',
    addressShort: '',
    coin: 0
  });

  useEffect(() => {
    if(myWallet.address !== ''){
      getTokenBalance();
    }
  }, [myWallet.address]);
  
  useEffect(() => {
    if(wallet.contractAddress !== ''){
      setMyWallet({
        address: wallet.contractAddress,
        addressShort: wallet.contractAddress.substring(0, 7),
        coin: 0
      });
    }
  }, [wallet]);

  const getTokenBalance = () => {
    BlockChainAPI.getTokenBalance(myWallet.address)
    .then(( data: number ) => {
      setMyWallet({ ...myWallet, coin: data});
    })
  };

  const onClickCharge = () => {
    setModal('charge');
  }

  const onClickWithdraw = () => {
    setModal('withdraw');
  }

  const onClose = () => {
    setModal('');
  }

  return (
    <>
      <div className={styles.wallet}>
        <h1 className={styles['wallet-title']}>내 지갑</h1>
        <div className={styles.hashnumber}>{myWallet.addressShort}</div>
        <div className={styles['coin-container']}>
          <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']} />
          <div className={styles.coin}>{myWallet.coin}</div>
        </div>
        <div className={styles['coin-btns']}>
          { memberRole === "CONSUMER" && 
            <>
              <button className={styles['coin-charge-btn']} onClick={onClickCharge}>충전하기</button> 
              <div className={styles['division-line']}>ㅣ</div>
              <button className={styles['coin-withdraw-btn']} onClick={onClickWithdraw}>출금하기</button>
            </>
          }
          { memberRole === "SHELTER" && 
            <>
              <button className={styles['coin-withdraw-btn']} onClick={onClickWithdraw}>환전하기</button>
            </>
          }
        </div>
      </div>
      { modal === "charge" && 
        <ModalMedium>
          <Charge
            onSubmitCharge={onSubmitCharge}
            onClose={onClose}/>
        </ModalMedium>
      }
      { modal === "widthraw" && 
        <ModalMedium>
          <Withraw
            onSubmigWithdraw={onSubmigWithdraw}
            onClose={onClose}/>
        </ModalMedium>
      }
    </>
  );
};

export default Wallet;