import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonationList from "../components/donationList/donationList";
import {
  TransactionItemType,
  TransactionListType,
  TranscationFilteredListType,
} from "../interface/blockchain";
import { RootState } from "../modules";
import * as BlockchainActions from "../modules/blockchain";

type DonatorContainerProps = {
  userTypeBoolean: boolean;
  check: boolean;
};

const DonatorContainer = ({ userTypeBoolean, check }: DonatorContainerProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const wallet = useSelector((state: RootState) => state.blockchain.walletInfo);
  const transactionList = useSelector(
    (state: RootState) => state.blockchain.transactionList
  );
  const dispatch = useDispatch();

  const [sendDataList, setSendDataList] =
    useState<TranscationFilteredListType[]>([]);
  const [receiveDataList, setReceiveDataList] = 
    useState<TranscationFilteredListType[]>([]);
  const [sendList, setSendList] = useState<TransactionItemType[]>([]);
  const [receiveList, setReceiveList] = 
    useState<TransactionItemType[]>([]);

  useEffect(() => {
    getWalletInfo();
  }, []);

  useEffect(() => {
    getTransactionList();
  }, [wallet]);

  useEffect(() => {
    if (transactionList.data) {
      const array = Array.from(transactionList.data.transactionList);

      setSendList(array.filter( item => item.fromId === member.data?.memberId ));
      setReceiveList(array.filter( item => item.toId === member.data?.memberId ));

      setSendDataList(sendList.map(item => change(item, item.toName)));
      setReceiveDataList(receiveList.map(item => change(item, item.fromName)));
    }
  }, [transactionList]);

  const change = (item: TransactionItemType, name: string) => ({
    id: item.toId,
    img: item.toProfileImage,
    amount: item.value,
    transaction: item.toName,
    date: '' + item.time.year +'.'+ item.time.monthValue +'.'+ item.time.dayOfMonth,
    name: name,
  })

  const getWalletInfo = () => {
    if (member.data) {
      dispatch(
        BlockchainActions.getWalletInfoAsync.request(member.data.memberId)
      );
    }
  };

  const getTransactionList = () => {
    if (wallet.data) {
      dispatch(
        BlockchainActions.getTransactionListAsync.request(
          wallet.data.contractAddress
        )
      );
    }
  };

  return (
    <>
      <DonationList
        dataList={ check? sendDataList : receiveDataList }
        // receiveDataList={receiveDataList}
        userTypeBoolean={userTypeBoolean}
      />
    </>
  );
};

export default DonatorContainer;
