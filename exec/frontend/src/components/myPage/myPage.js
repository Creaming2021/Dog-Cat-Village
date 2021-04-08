import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './myPage.module.css';

import DonatedShelterListContainer from '../../containers/donatedShelterListContainer';
import UserInfo from '../userInfo/userInfo';
import Nav from '../nav/nav';
import WalletContainer from '../../containers/walletContainer';
import AdoptedAnimalsChart from '../chart/adoptedAnimalsChart';
import ContributionChart from '../chart/contributionChart';
import DonatorContainer from '../../containers/donatorContainer';


const MyPage = ({ memberInfo }) => {
  
  const [userTypeBoolean, setUserTypeBoolean] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (memberInfo.data && memberInfo.data.memberRole === 'SHELTER') {
      setUserTypeBoolean(false);
    } else if (memberInfo.data && memberInfo.data.memberRole === 'CONSUMER') {
      setUserTypeBoolean(true);
    } else {
      // props.history.push('/')
    }
    setIsReady(true);
  }, []);

  return ( 
    isReady 
      ? <div className={`${styles.mypage} ${userTypeBoolean ? styles.user : styles.shelter}`}>
          <div className={styles['upper-container']}>
            <Nav role={userTypeBoolean ? "CONSUMER" : "SHELTER"} />
          </div>
          <div className={styles['main-container']}>
            <div className={styles['left-container']}>
              <div className={styles['user-info-box']}>
                <UserInfo userTypeBoolean={userTypeBoolean} memberInfo={memberInfo}/>
              </div>
              <div className={styles['wallet-box']}>
                <WalletContainer className={styles.wallet} />
              </div>
            </div>
            <div className={styles['donation-list-box']}>
              <DonatorContainer userTypeBoolean={userTypeBoolean} />
            </div>
            <div className={styles['etc-boxes']}>
              {
                userTypeBoolean 
                ? <DonatedShelterListContainer /> 
                : <>
                    {/* <ContributionChart /> */}
                    <AdoptedAnimalsChart />
                  </>
              }    
            </div>
          </div>
        </div>
      : <div>loding...</div>
  );
};

export default MyPage;
