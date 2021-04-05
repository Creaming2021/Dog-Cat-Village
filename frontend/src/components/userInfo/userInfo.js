import React, { useEffect, useState } from 'react';
import { ImageLarge } from '../common/common';
import styles from './userInfo.module.css';
import UserInfoEdit from './userInfoEdit';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../modules/consumer';

const UserInfo = ({ userTypeBoolean }) => {
  const [editState, setEditState] = useState(false);
  const memberInfo = useSelector((state) => state.member.memberInfo);
  const consumerInfo = useSelector((state) => state.consumer);
  const dispatch = useDispatch();

  useEffect(()=> {
    if (memberInfo.data) { 
      dispatch(getUserInfo(memberInfo.data.memberId));
    }
    console.log(memberInfo);
    console.log(consumerInfo);
  },[]);

  const changeEditState = () => {
    setEditState(true);
  };

  const deleteAccount = () => {
    const result = window.confirm('탈퇴하시겠습니까?');
    console.log(result);
  }
  
  return (
    <>
      {
        editState 
        ? <UserInfoEdit setEditState={setEditState} userTypeBoolean={userTypeBoolean}/>
        : <div className={styles['user-info']}>
            <div className={styles['user-img-box']}>
              <ImageLarge src={consumerInfo.profileImage} alt={"fakeimgdata"} />
              <div className={styles['user-description']}>
                <h2>{consumerInfo.name}</h2>
                <h4>({consumerInfo.email})</h4>
                <h3>{consumerInfo.phoneNumber}</h3>
              </div>
            </div>
            <div className={styles['btn-container']}>
              <button className={`${styles['user-info-edit-btn']} ${!userTypeBoolean && styles['blue-btn']}`} onClick={changeEditState}>수정</button> 
              <div className={styles['btn-divide-line']}>ㅣ</div>
              <button className={`${styles['user-unsubs-btn']} ${!userTypeBoolean && styles['blue-btn']}`} onClick={deleteAccount} >탈퇴</button>
            </div>
          </div>
      }
    </>
  );
};

export default UserInfo;