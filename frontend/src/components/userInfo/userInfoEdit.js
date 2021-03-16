import React, { useState } from 'react';
import styles from './userInfoEdit.module.css';

function UserInfoEdit(props) {
  const [imgUrl, setImgUrl] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editPhoneNumber1, setEditPhoneNumber1] = useState('');
  const [editPhoneNumber2, setEditPhoneNumber2] = useState('');
  const [editPhoneNumber3, setEditPhoneNumber3] = useState('');



  const handleChangeImg = (event) => {
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  const changeEditState = () => {
    props.setEditState(false);
  };

  const submitUserInfo = () => {
    //TODO: 요청보내기
    const phoneNumber = editPhoneNumber1 + editPhoneNumber2 + editPhoneNumber3;
    if (phoneNumber.length !== 11) {
      alert('핸드폰 번호를 다시 입력하세요');
      return;
    } 
    const data = {
      imgUrl,
      currentPassword,
      password1,
      editNickname,
      phoneNumber
    };
    console.log(data);
  };

  return (
    <div className={styles['user-info-edit']}>
      <div className={styles['user-info-img']}>
        <img 
          src={imgUrl || '../../images/jiyoung.png' } 
          alt="fakeimgdata" 
          className={styles['user-img']} 
        />
        <label htmlFor="img-file" className={styles['user-img-edit-btn']}>
          프로필 이미지 편집
        </label>
        <input 
          type="file" id="img-file" className={styles['img-input-tag']} 
          onChange={handleChangeImg} 
        />
      </div>
      <input 
        type="password" 
        placeholder="CURRENT PW" 
        className={[styles['user-input-form'], styles['current-pw']].join(' ')}
        onChange={(e) => {setCurrentPassword(e.target.value);}}
      />
      <input 
        type="password" 
        placeholder="NEW PW" 
        className={[styles['user-input-form'], styles['new-pw']].join(' ')} 
        onChange={(e) => {setPassword1(e.target.value);}} 
      />
      <input 
        type="password" 
        placeholder="PW CONFIRM" 
        className={[styles['user-input-form'], styles['new-pw-confirm']].join(' ')} 
        onChange={(e) => {setPassword2(e.target.value);}} 
      />
      <div className={styles['nickname-container']}>
        <input 
          type="text" 
          className={[styles['user-input-form'], styles.nickname].join(' ')}
          onChange={(e) => {setEditNickname(e.target.value);}}
        />
        <button className={styles['nickname-check']}>중복체크</button>
      </div>
      <div className={styles.phonenumber}>
        <input 
          type="text" 
          maxLength="3" 
          className={[styles['user-input-form'], styles.phonenumber1].join(' ')} 
          onChange={(e) => {setEditPhoneNumber1(e.target.value);}}
        /> 
        <div className={styles['phonenumber-dash']}>-</div>
        <input 
          type="text" 
          maxLength="4" 
          className={[styles['user-input-form'], styles.phonenumber2].join(' ')}
          onChange={(e) => {setEditPhoneNumber2(e.target.value);}}          
        />
        <div className={styles['phonenumber-dash']}>-</div>
        <input 
          type="text" 
          maxLength="4" 
          className={[styles['user-input-form'], styles.phonenumber2].join(' ')}
          onChange={(e) => {setEditPhoneNumber3(e.target.value);}}
        />
      </div>
      <div className={styles['edit-btns']}>
        <button className={styles['edit-cancel-btn']} onClick={changeEditState}>수정취소</button>
        <button className={styles['edit-confirm-btn']} onClick={submitUserInfo} >수정완료</button>
      </div>
    </div>
  );
};

export default UserInfoEdit;