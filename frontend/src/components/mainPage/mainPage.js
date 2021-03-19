import React from 'react';
import styles from './mainPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faCoins,  faDog } from '@fortawesome/free-solid-svg-icons';

const MainPage = () => {
  return (
    <>
      <div className={styles['upper-part']}>
        {/* 로고 */}
        {/* 네브바 */}
        {/* 마이페이지 아이콘 */}
      </div>
      <div className={styles['main-part']}>
        <h1 className={styles['main-text1']}>오늘 기부된 총 금액</h1>
        <div className={styles['number-box1']}>
          <h1 className={styles['number-text1']}>3</h1>
        </div>
        <div className={styles['number-box2']}>
          <h1 className={styles['number-text2']}>2</h1>
        </div>
        <div className={styles['number-box3']}>
          <h1 className={styles['number-text3']}>0</h1>
        </div>
        <h1 className={styles['main-text2']}>코인</h1>
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

export default MainPage;