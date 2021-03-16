import React from 'react';
import styles from './userInfoEdit.module.css';

function UserInfoEdit() {
  return (
    <div className={styles['user-info-edit']}>
      <div className={styles['user-info-img']}>
        <img src="../../images/jiyoung.png" alt="fakeimgdata" className={styles['user-img']} />
        <button className={styles['user-img-edit-btn']}>프로필 이미지 편집</button>
      </div>
      <input type="text" placeholder="CURRENT PW" className={[styles['user-input-form'], styles['current-pw']].join(' ')} />
      <input type="text" placeholder="NEW PW" className={[styles['user-input-form'], styles['new-pw']].join(' ')} />
      <input type="text" placeholder="PW CONFIRM" className={[styles['user-input-form'], styles['new-pw-confirm']].join(' ')} />
      <div className={styles['nickname-container']}>
        <input type="text" className={[styles['user-input-form'], styles.nickname].join(' ')} />
        <button className={styles['nickname-check']}>중복체크</button>
      </div>
      <div className={styles.phonenumber}>
        <input type="text" maxLength="4" className={[styles['user-input-form'], styles.phonenumber1].join(' ')} /> 
        <div className={styles['phonenumber-dash']}>-</div>
        <input type="text" maxLength="4" className={[styles['user-input-form'], styles.phonenumber2].join(' ')} />
        <div className={styles['phonenumber-dash']}>-</div>
        <input type="text" maxLength="4" className={[styles['user-input-form'], styles.phonenumber2].join(' ')} />
      </div>
      <div className={styles['edit-btns']}>
        <button className={styles['edit-cancel-btn']}>수정취소</button>
        <button className={styles['edit-confirm-btn']}>수정완료</button>
      </div>
    </div>
  );
};

export default UserInfoEdit;