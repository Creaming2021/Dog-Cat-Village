import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdoptRegister from '../components/adopt/adoptRegister/adoptRegister';
import { AdoptRegisterType } from '../interface/adopt';
import { RootState } from '../modules';

type AdoptRegisterContainerProps = {
	onClose: () => void,
}

const AdoptRegisterContainer = ({ onClose,  }: AdoptRegisterContainerProps) => {
	const member = useSelector((state: RootState) => state.member.memberInfo);
	const dispatch = useDispatch();

	const onRegisterAdopt = (adoptInputForm: AdoptRegisterType) => {

	}

	return (
	<>
		<AdoptRegister
			onSubmit={onRegisterAdopt}
			onClose={onClose}/>
	</>);
}

export default AdoptRegisterContainer;