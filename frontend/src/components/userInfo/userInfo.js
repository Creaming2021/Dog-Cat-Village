import React from 'react';
import styles from './userInfo.module.css';

function UserInfo() {
  return (
    <div className={styles['user-info']}>
      <img src="../../images/jiyoung.png" alt="fakedata" className={styles['user-info-img']}/>
      <div className={styles['user-info-description']}>
        <h2>지용🐾</h2>
        <h4>( jiyoung@gmail.com )</h4>
        <h3>010-2325-3970</h3>
      </div>
      <div>
        <button className={styles['user-info-edit-button']}>수정</button> 
        ㅣ<button className={styles['user-info-unsubs-button']}>탈퇴</button>
        </div>
    </div>
  );
};

export default UserInfo;