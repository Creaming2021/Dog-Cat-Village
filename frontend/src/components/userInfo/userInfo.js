import React, { useEffect, useState } from 'react';
import { ImageLarge } from '../common/common';
import styles from './userInfo.module.css';
import UserInfoEdit from './userInfoEdit';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../modules/consumer';
import { getShelterInfo } from '../../modules/shelter';
import { security } from '../../service/instance';


const UserInfo = ({ userTypeBoolean, memberInfo }) => {
  const [editState, setEditState] = useState(false);
  const [profileImg, setProfileImg] = useState('');

  const consumerInfo = useSelector((state) => state.consumer);
  const shelterInfo = useSelector((state) => state.shelter);
  const dispatch = useDispatch();

  useEffect(()=> {
    console.log(memberInfo);
    console.log(consumerInfo);
    console.log(shelterInfo);
    if (memberInfo.data) {
      if (userTypeBoolean) {
        dispatch(getUserInfo(memberInfo.data.memberId));
      } else {
        dispatch(getShelterInfo(memberInfo.data.memberId));
      }
    } 
  },[]);

  const changeEditState = () => {
    setEditState(true);
  };

  const deleteAccount = () => {
    const result = window.confirm('탈퇴하시겠습니까?');
    if (result) {
      security.delete(`/members/${memberInfo.data.memberId}`,{
        'headers': {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
      .then((response) => {console.log(response)})
    }
  }
  
  return (
    <>
      {
        editState 
        ? <UserInfoEdit setProfileImg={setProfileImg} setEditState={setEditState} userTypeBoolean={userTypeBoolean} memberInfo={memberInfo} consumerInfo={consumerInfo} />
        : <div className={styles['user-info']}>
            <div className={styles['user-img-box']}>
              <ImageLarge src={profileImg || (userTypeBoolean ? consumerInfo.profileImage : shelterInfo.profileImage)} alt={"fakeimgdata"} />
              <div className={styles['user-description']}>
                <h2>{userTypeBoolean ? consumerInfo.name : shelterInfo.name}</h2>
                <h4>({userTypeBoolean ? consumerInfo.email : shelterInfo.email})</h4>
                <h3>{userTypeBoolean ? consumerInfo.phoneNumber : shelterInfo.phoneNumber}</h3>
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