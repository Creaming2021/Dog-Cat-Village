import React, { useEffect, useState } from 'react';
import styles from './myPage.module.css';

import DonatedShelterList from '../donatedShelterList/donatedShelterList';
import DonationList from '../donationList/donationList';
import UserInfo from '../userInfo/userInfo';
import Wallet from '../wallet/wallet';
import Nav from '../nav/nav';
import AdoptedAnimalsChart from '../chart/adoptedAnimalsChart';
import ContributionChart from '../chart/contributionChart';


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
            <Wallet userTypeBoolean={userTypeBoolean} />
          </div>
        </div>
        <div className={styles['donation-list-container']}>
          <DonationList userTypeBoolean={userTypeBoolean} />
        </div>
        <div className={styles['list-containers']}>
          {userTypeBoolean && <DonatedShelterList />}
          <ContributionChart />
          <AdoptedAnimalsChart />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
