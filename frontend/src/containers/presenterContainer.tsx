import React from 'react';
import { useSelector } from 'react-redux';
import ReadyStreaming from '../components/shelter/readyStreaming/readyStreaming';
import { RootState } from '../modules';

const PresenterContainer = () => {

	const member = useSelector((state: RootState) => state.member.memberInfo);

	return (
	<>
		<ReadyStreaming member={member.data}/>
	</>
	);
};

export default PresenterContainer;