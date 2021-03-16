import React, { useState } from 'react';
import styles from './userInfo.module.css';
import UserInfoEdit from './userInfoEdit';


function UserInfo() {
  const [editState, setEditState] = useState(false);

  const changeEditState = () => {
    setEditState(true);
  };

  return (
    <>
      {
        editState ? <UserInfoEdit setEditState={setEditState} />
        : <div className={styles['user-info']}>
            <div className={styles['user-img-box']}>
              <img src="../../images/jiyoung.png" alt="fakeimgdata" className={styles['user-img']}/>
              <div className={styles['user-description']}>
                <h2>지용</h2>
                <h4>( jiyoung@gmail.com )</h4>
                <h3>010-2325-3970</h3>
              </div>
            </div>
            <div>
              <button className={styles['user-info-edit-btn']} onClick={changeEditState}>수정</button> 
              ㅣ<button className={styles['user-unsubs-btn']}>탈퇴</button>
            </div>
          </div>
      }
    </>
  );
};

export default UserInfo;