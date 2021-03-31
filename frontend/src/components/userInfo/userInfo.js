import React, { useState } from 'react';
import { ImageLarge } from '../common/common';
import styles from './userInfo.module.css';
import UserInfoEdit from './userInfoEdit';


const UserInfo = ({userTypeBoolean}) => {
  const [editState, setEditState] = useState(false);

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
              <ImageLarge src={"../../images/jiyoung.png"} alt={"fakeimgdata"} />
              <div className={styles['user-description']}>
                <h2>지용</h2>
                <h4>( jiyoung@gmail.com )</h4>
                <h3>010-2325-3970</h3>
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