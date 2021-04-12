import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as BlockchainActions from '../../../modules/blockchain';

type ChargeFinishProps = {
	match: any
}


const ChargeFinish = ({ match }: ChargeFinishProps) => {
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(BlockchainActions.sendChargeToken.request(match))
	}, []);

	return (<></>);
}

export default ChargeFinish;