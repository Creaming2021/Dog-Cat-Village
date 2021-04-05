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
    console.log("여기");
  }, [member.data]);

  const getWalletInfo = () => {
    if( member.data ){
      dispatch(BlockchainActions.getWalletInfoAsync.request(member.data.memberId));
    }
  }

  const onSubmitCharge = (amount: string) => {
    alert("충전요청!");
    dispatch(BlockchainActions.chargeCoinAsync.request(amount));
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
