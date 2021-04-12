import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonatedShelterList from "../components/donatedShelterList/donatedShelterList";
import { TransactionListType } from "../interface/blockchain";
import { RootState } from "../modules";
import * as BlockchainActions from "../modules/blockchain";

const DonatedShelterListContainer = () => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const transactionList = useSelector((state: RootState) => state.blockchain.transactionList);
  const wallet = useSelector((state: RootState) => state.blockchain.walletInfo);
  const dispatch = useDispatch();

  const [ filteredTransactionList, setFilteredTransactionList ] = useState<TransactionListType[]>([]);

  useEffect(() => {
    getTransactionList();
  }, []);

  useEffect(() => {
    if(transactionList.data){
      // const result = transactionList.data.filter(transaction => transaction.fromId == member.data?.memberId);
      setFilteredTransactionList({ ...transactionList.data });
    }
  }, [transactionList]);

  const getTransactionList = () => {
    if(wallet.data){
      dispatch(BlockchainActions.getTransactionListAsync.request(wallet.data.contractAddress));
    }
  };

  return (
    <DonatedShelterList 
      transactionList={filteredTransactionList}
    />);
};

export default DonatedShelterListContainer;
