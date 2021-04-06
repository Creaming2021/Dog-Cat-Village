import React from 'react';
import { useSelector } from 'react-redux';
import MyPage from '../components/myPage/myPage';

const ProfileContainer = () => {

  const memberInfo = useSelector((state) => state.member.memberInfo);

  return (
    <MyPage memberInfo={memberInfo} />
  );
};

export default ProfileContainer;