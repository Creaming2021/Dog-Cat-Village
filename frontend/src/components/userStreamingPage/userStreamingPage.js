import React from 'react';
import styles from './userStreamingPage.module.css';
import Nav from '../nav/nav';
import { ImageSmall } from '../common/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBone, faPaw, faFish } from '@fortawesome/free-solid-svg-icons';

const UserStreamingPage = () => {
  return(
    <div className={styles['user-streaming-container']}>
      <div className={styles['upper-container']}>
        <Nav role={'CONSUMER'} />        
      </div>
      <div className={styles['main-box']}>
        <div className={styles['streaming-container']}>
          {/*  쿠렌토화면 넣어야함  */}
        </div>
        <div className={styles['streaming-info-container']}>
          <div className={styles['shelter-img']}>
            <ImageSmall/>
          </div>
          <div className={styles['streaming-host-info']}>
            <div className={styles['streaming-name']}>
              댕댕이 라이브 _ 방송 후원은 사랑입니다 😍😎
            </div>
            <div className={styles['shelter-info-container']}>
              <div className={styles['shelter-name']}>
                제이 아죠씨의 동물농장
              </div>
              <div className={styles['viewer-container']}>
                <FontAwesomeIcon icon={faUserCircle} className={styles['user-icon']}/>
                <div className={styles['viewer-num']}>145</div>
              </div>
            </div>
          </div>
          <div className={styles['icons-container']}>
            <FontAwesomeIcon icon={faBone} className={styles['bone-icon']}/>
            <FontAwesomeIcon icon={faPaw} className={styles['paw-icon']} />
            <FontAwesomeIcon icon={faFish} className={styles['fish-icon']} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStreamingPage;
