import React from "react";
import { useSelector } from "react-redux";
import Wallet from "../components/blockchain/wallet/wallet";
import { RootState } from "../modules";

const WalletContainer = () => {
  const wallet = useSelector((state: RootState) => state.blockchain.walletInfo);
  const changeTransaction = useSelector((state: RootState) => state.blockchain.changeTransaction);
   
  

  return (<>
  { wallet.data && 
    <Wallet 
      wallet={wallet.data} 
    />
  }</>);
};

export default WalletContainer;
