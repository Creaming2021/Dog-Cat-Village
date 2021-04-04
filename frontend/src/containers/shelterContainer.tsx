import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayPartsToString } from 'typescript';
import SubMain from '../components/shelter/subMain/subMain';
import { RootState } from '../modules';
import * as MemberActions from '../modules/member';

const ShelterContainer = () => {
	const member = useSelector((state: RootState) => state.member.memberInfo);
	const shelter = useSelector((state: RootState) => state.member.shelterInfo);
	const profile = useSelector((state: RootState) => state.member.profileInfo);
	const dispatch = useDispatch();

	useEffect(() => {
		if(member.data) {
			dispatch(MemberActions.getShelterInfoAsync.request(member.data.memberId));
		}
	},[]);

	return (<>
		{ member.data !== null && shelter.data !== null && !profile.data &&
			<SubMain
				member={member.data}
				shelter={shelter.data}
				profile={profile.data || {
					profileImage: '',
					name: '예시',
					phoneNumber: '번호',
					email: '메일'
				}}
			/>
		}
	</>);
}

export default ShelterContainer;