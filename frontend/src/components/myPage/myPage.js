import React, { useState } from 'react';
import styles from './myPage.module.css';

import DonatedShelterList from '../donatedShelterList/donatedShelterList';
import DonationList from '../donationList/donationList';
import UserInfo from '../userInfo/userInfo';
import Wallet from '../wallet/wallet';


function MyPage() {
  
  const [userType, setUserType] = useState('user');

  return (
    <div className={`${styles.mypage} ${userType === 'user' ? styles.user : styles.shelter}`}>
      <div className={styles.upperbox}>
        {/* 로고 */}
        {/* 네브바 */}
        {/* 이모티콘? 어디로 가는거지..? */}
      </div>
      <div className={styles.content}>
        <div className={styles.leftbox}>
          <div className={styles['user-info-container']}>
            <UserInfo  />
          </div>
          <div className={styles['wallet-container']}>
            <Wallet className={styles.wallet} />
          </div>
        </div>
        <div className={styles['donation-list-container']}>
          <DonationList />
        </div>
        <div className={styles['donated-shelter-list-container']}>
          <DonatedShelterList />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
