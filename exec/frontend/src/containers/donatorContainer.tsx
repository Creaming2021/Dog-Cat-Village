import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonationList from "../components/donationList/donationList";
import {
  TransactionListType,
  TranscationFilteredListType,
} from "../interface/blockchain";
import { RootState } from "../modules";
import * as BlockchainActions from "../modules/blockchain";

type DonatorContainerProps = {
  userTypeBoolean: boolean;
};

const DonatorContainer = ({ userTypeBoolean }: DonatorContainerProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const wallet = useSelector((state: RootState) => state.blockchain.walletInfo);
  const transctionList = useSelector(
    (state: RootState) => state.blockchain.transactionList
  );
  const dispatch = useDispatch();

  const [sendDataList, setSendDataList] =
    useState<TranscationFilteredListType[]>([]);
  const [receiveDataList, setReceiveDataList] = 
    useState<TranscationFilteredListType[]>([]);
  const [sendList, setSendList] = useState<TransactionListType[]>([]);
  const [receiveList, setReceiveList] = 
    useState<TransactionListType[]>([]);

  useEffect(() => {
    getWalletInfo();
  }, []);

  useEffect(() => {
    getTransactionList();
  }, [wallet]);

  useEffect(() => {
    if (transctionList.data) {
      [].forEach.call(
        transctionList.data,
        (item: TransactionListType) => {
          if(item.fromId === member.data?.memberId){
            setSendList(sendList.concat(item));
          }
        }
      );

      [].forEach.call(
        transctionList.data,
        (item: TransactionListType) => {
          if(item.toId === member.data?.memberId){
            setReceiveList(receiveList.concat(item));
          }
        }
      );

      setSendDataList(
        sendList.map((item) => ({
          id: item.toId,
          img: item.toProfileImage,
          amount: +item.value,
          transaction: item.toName,
          date: item.time,
        }))
      );

      setReceiveDataList(
        receiveList.map((item) => ({
          id: item.toId,
          img: item.toProfileImage,
          amount: +item.value,
          transaction: item.toName,
          date: item.time,
        }))
      );
    }
  }, [transctionList]);

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
        sendDataList={sendDataList}
        receiveDataList={receiveDataList}
        userTypeBoolean={userTypeBoolean}
      />
    </>
  );
};

export default DonatorContainer;
