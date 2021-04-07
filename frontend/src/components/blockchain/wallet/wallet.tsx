import React, { useState, useEffect } from 'react';
import styles from './wallet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import * as BlockChainAPI from '../../../service/blockchainAPI';
import { WalletType } from '../../../interface/blockchain';
import { ModalSmall } from '../../common/common';
import Charge from '../charge/charge';
import Withraw from '../withraw/withraw';

type WalletProps = {
  wallet: WalletType | null,
  memberRole: string | undefined,
  onSubmitCharge: (amount: string) => void,
  onSubmigWithdraw: () => void,
  modal: string,
  setModal: (modal: string) => void,
}

const Wallet = ({ wallet, memberRole, onSubmitCharge, onSubmigWithdraw, modal, setModal }: WalletProps ) => {
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
    if(wallet && wallet.contractAddress !== ''){
      setMyWallet({
        ...myWallet,
        address: wallet.contractAddress,
        addressShort: wallet.contractAddress.substring(0, 7),
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
            </>
          }
        </div>
      </div>
      { modal === "charge" && 
        <ModalSmall>
          <Charge
            onSubmitCharge={onSubmitCharge}
            onClose={onClose}/>
        </ModalSmall>
      }
    </>
  );
};

export default Wallet;