import React from 'react';
import styles from './streamingListItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const StreamingListItem = ({data}) => {
  return(
    <div className={styles['streaming-container']}>
      <div className={styles['img-container']}>
        <img src={data.img} className={styles['streaming-img']} />
      </div>
      <div className={styles['straming-discription-container']}>
        <div className={styles['streaming-name']}>
          {data.streamingName}
        </div>
        <div className={styles['discription-inner-container']}>
          <div className={styles['shelter-name']}>
            {data.shelterName}
          </div>
          <div className={styles['viewer-container']}>
            <FontAwesomeIcon icon={faUserCircle} className={styles['user-icon']}/>
            <div className={styles['viewer-num']}>{data.viewer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingListItem;