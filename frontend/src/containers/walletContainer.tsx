import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wallet from "../components/blockchain/wallet/wallet";
import { RootState } from "../modules";
import * as BlockchainActions from '../modules/blockchain';

const WalletContainer = () => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const wallet = useSelector((state: RootState) => state.blockchain.walletInfo);
  const dispatch = useDispatch(); 

  useEffect(() => {
    getWalletInfo();
  }, []);

  const getWalletInfo = () => {
    if( member.data ){
      dispatch(BlockchainActions.getWalletInfoAsync.request(member.data.memberId));
    }
  }

  const onSubmitCharge = () => {
    alert("충전요청!");
  }

  const onSubmigWithdraw = () => {
    alert("출금요청!");
  }

  return (<>
  { wallet.data && member.data &&
    <Wallet 
      wallet={wallet.data}
      memberRole={member.data.memberRole}
      onSubmitCharge={onSubmitCharge}
      onSubmigWithdraw={onSubmigWithdraw}
    />
  }</>);
};

export default WalletContainer;
