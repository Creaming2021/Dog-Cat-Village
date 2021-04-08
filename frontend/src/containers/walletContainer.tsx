import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wallet from "../components/blockchain/wallet/wallet";
import { RootState } from "../modules";
import * as Blockchain from '../service/blockchainAPI';
import * as BlockchainActions from '../modules/blockchain';

const WalletContainer = () => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const wallet = useSelector((state: RootState) => state.blockchain.walletInfo);
  const dispatch = useDispatch(); 

  const [ modal, setModal ] = useState<string>('');

  useEffect(() => {
    getWalletInfo();
  }, []);

  const getWalletInfo = () => {
    if( member.data ){
      dispatch(BlockchainActions.getWalletInfoAsync.request(member.data.memberId));
    }
  }

  const onSubmitCharge = (amount: string) => {
    dispatch(BlockchainActions.chargeCoinAsync.request(amount));
    Blockchain.sendTransaction(
      { toAddress: wallet.data?.contractAddress, 
        amount: amount,
        fromAddress: '',
        fromPrivateKey: '',
      });
    setModal('');
  }

  const onSubmigWithdraw = () => {
    alert("출금요청!");
  }

  return (<>
    <Wallet 
      wallet={wallet.data}
      memberRole={member.data?.memberRole}
      onSubmitCharge={onSubmitCharge}
      onSubmigWithdraw={onSubmigWithdraw}
      modal={modal}
      setModal={setModal}
    />
  </>);
};

export default WalletContainer;
