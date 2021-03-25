import React, { useEffect, useState } from 'react';
import styles from './userMainPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faVideo, faCoins,  faDog } from '@fortawesome/free-solid-svg-icons';

const coin = [0,0,0]
const animal = [0,0,0]


const todayTotalDonation = () => {
  return (
    <div className={styles['main-part']}>
      <h1 className={styles['main-text']}>오늘 기부된 총 금액</h1>
      {
        coin.map(number => {
          return (
            <div className={`${styles['number-box']} ${styles.yellow}`}>
              <h1 className={styles['number-text']}>{number}</h1>
            </div>
          );
        })
      }
      <h1 className={styles['main-text']}>코인</h1>
    </div>
  );
}

const todayAdoptedAnimalCount = () => {
  return (
    <div className={styles['main-part']}>
      <h1 className={styles['main-text']}>오늘 입양된 동물 수</h1>
      {
        animal.map(number => {
          return (
            <div className={`${styles['number-box']} ${styles.blue}`}>
              <h1 className={styles['number-text']}>{number}</h1>
            </div>
          );
        })
      }
      
      <h1 className={styles['main-text']}>마리</h1>
    </div>
  );
}




const UserMainPage = () => {
  const [boardToggle, setBoardToggle] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setBoardToggle(!boardToggle);
    }, 10000);
  }, [boardToggle]);

  return (
    <>
      <div className={styles['upper-part']}>
        {/* 로고 */}
        <FontAwesomeIcon icon={faIdBadge} className={styles['idBadge-icon']} />
      </div> 
      <div className={boardToggle ? styles.displayNone : styles.display }>
        {todayTotalDonation()}
      </div>
      <div className={boardToggle ? styles.display :  styles.displayNone }>
        {todayAdoptedAnimalCount()}
      </div>
      <div className={styles['lower-part']}>
        <div className={styles['vod-container']}>
          <FontAwesomeIcon icon={faVideo} className={styles['video-icon']} />
          <div className={styles['vod-text']}>동물 보러 가기</div>
        </div>
        <div className={styles['donate-container']}>
          <FontAwesomeIcon icon={faCoins} className={styles['coin-icon']} />
          <div className={styles['donate-text']}>기부 하러 가기</div>
        </div>
        <div className={styles['adopt-container']}>
          <FontAwesomeIcon icon={faDog} className={styles['dog-icon']} />
          <div className={styles['adopt-text']}>입양 보러 가기</div>
        </div>
      </div>
    </>
  );
};

export default UserMainPage;