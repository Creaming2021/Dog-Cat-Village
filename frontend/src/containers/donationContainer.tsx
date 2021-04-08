import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Donate from '../components/blockchain/donate/donate';
import { RootState } from '../modules';
import * as BlockchainAPI from '../service/blockchainAPI';
import * as BlockchainAction from '../modules/blockchain';

type DonationContainerProp = {
  onClose: () => void,
	shelterId: number,
}

const DonationContainer = ({ onClose, shelterId }: DonationContainerProp) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
	const changeTransaction = useSelector((state: RootState) => state.blockchain.changeTransaction);
	const dispatch = useDispatch();

	const [ balance, setBalance ] = useState<number>(0);

	useEffect(() => {
		if( member.data ){
      dispatch(BlockchainAction.getWalletInfoAsync.request(member.data.memberId));
    }
	}, []);

	useEffect(() => {
		if(member.data){
			dispatch(BlockchainAction.changeIdToAddressAsync.request(
				{ consumerId: member.data.memberId, shelterId: shelterId }));
		}
	}, [member]);

	useEffect(() => {
		console.log()
		if(changeTransaction.data){
			BlockchainAPI.getTokenBalance(changeTransaction.data.consumerAddress)
			.then((res) => setBalance(res));
		}
	}, [changeTransaction]);
 
	const onDonation = (amount: number) => {
		// 후원하기
		if(balance < amount) {
			alert("코인을 다시 설정해 주세요.");
		} else {
			BlockchainAPI.donateTransaction(
				{ toAddress: changeTransaction.data?.shelterAddress, 
					amount: amount,
					fromAddress: changeTransaction.data?.consumerAddress,
					fromPrivateKey: changeTransaction.data?.consumerPrivateKey,
				});
			onClose();
		}
	}

	return (
		<Donate 
			onClose={onClose} 
			onDonation={onDonation} 
			balance={balance}/>);
}

export default DonationContainer;