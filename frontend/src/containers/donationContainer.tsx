import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Donate from '../components/blockchain/donate/donate';
import { RootState } from '../modules';
import * as BlockchainAPI from '../service/blockchainAPI';
import * as BlockchainAction from '../modules/blockchain';

type DonationContainerProp = {
  onClose: () => void,
}

const DonationContainer = ({ onClose }: DonationContainerProp) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
	const wallet = useSelector((state: RootState) => state.blockchain.walletInfo);
	const dispatch = useDispatch();

	const [ balance, setBalance ] = useState<number>(0);

	useEffect(() => {
		if( member.data ){
      dispatch(BlockchainAction.getWalletInfoAsync.request(member.data.memberId));
    }
	}, []);

	useEffect(() => {
		if(member.data){
			dispatch(BlockchainAction.getWalletInfoAsync.request(member.data.memberId));
		}
	}, [member]);


	const onDonation = () => {

	}



	return (
		<Donate 
			onClose={onClose} 
			onDonation={onDonation} 
			balance={balance}/>);
}

export default DonationContainer;