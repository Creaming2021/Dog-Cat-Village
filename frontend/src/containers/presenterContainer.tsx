import React from 'react';
import { useSelector } from 'react-redux';
import ReadyStreaming from '../components/shelter/streaming/readyStreaming';
import { RootState } from '../modules';

const PresenterContainer = () => {

	const member = useSelector((state: RootState) => state.member.memberInfo);

	return (
	<>
		{ member.data && 
			<ReadyStreaming 
				member={member.data} 
				shelterId={member.data?.memberId} 
				roomName="방제"/>}
	</>
	);
};

export default PresenterContainer;