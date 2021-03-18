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
          <UserInfo className={styles['user-info']} />
          <Wallet className={styles.wallet} />
        </div>
        <DonationList className={styles['donation-list']}/>
        <DonatedShelterList className={styles['donated-shelter-list']}/>
      </div>
    </div>
  );
};

export default MyPage;
