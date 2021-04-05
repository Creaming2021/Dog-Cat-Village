import React, { useEffect, useState } from 'react';
import styles from './myPage.module.css';

import DonatedShelterListContainer from '../../containers/donatedShelterListContainer';
import DonationList from '../donationList/donationList';
import UserInfo from '../userInfo/userInfo';
import Wallet from '../blockchain/wallet/wallet';
import Nav from '../nav/nav';


const MyPage = () => {
  
  // const [userType, setUserType] = useState('user');
  const [userTypeBoolean, setUserTypeBoolean] = useState(true);
  

  useEffect(() => {
    setUserTypeBoolean(false);
  }, []);

  return (
    <div className={`${styles.mypage} ${userTypeBoolean ? styles.user : styles.shelter}`}>
      <div className={styles.upperbox}>
        {/* 로고 */}
        <Nav name="userMyPage"/>
        {/* 이모티콘? 어디로 가는거지..? */}
      </div>
      <div className={styles.content}>
        <div className={styles.leftbox}>
          <div className={styles['user-info-container']}>
            <UserInfo userTypeBoolean={userTypeBoolean} />
          </div>
          <div className={styles['wallet-container']}>
            <Wallet className={styles.wallet} />
          </div>
        </div>
        <div className={styles['donation-list-container']}>
          <DonationList />
        </div>
        <div className={styles['donated-shelter-list-container']}>
          <DonatedShelterListContainer />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
