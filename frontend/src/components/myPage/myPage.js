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
      <div className={styles['upper-container']}>
        <Nav role={userTypeBoolean ? "CONSUMER" : "SHELTER"} />
      </div>
      <div className={styles['main-container']}>
        <div className={styles['left-container']}>
          <div className={styles['user-info-box']}>
            <UserInfo userTypeBoolean={userTypeBoolean} />
          </div>
          <div className={styles['wallet-box']}>
            <Wallet userTypeBoolean={userTypeBoolean} />
          </div>
        </div>
        <div className={styles['donation-list-box']}>
          <DonationList userTypeBoolean={userTypeBoolean} />
        </div>
        <div className={styles['etc-boxes']}>
          {
            userTypeBoolean 
            ? <DonatedShelterList /> 
            : <>
                <ContributionChart />
                <AdoptedAnimalsChart />
              </>
          }    
        </div>
      </div>
    </div>
  );
};

export default MyPage;
