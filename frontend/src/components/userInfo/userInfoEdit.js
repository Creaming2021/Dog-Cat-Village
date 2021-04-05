import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, postUserProfileImg, putUserInfo } from '../../modules/consumer';
import { getShelterInfo, postShelterProfileImg, putShelterInfo } from '../../modules/shelter';
import member from '../../modules/member';
import { ImageSmall } from '../common/common';
import styles from './userInfoEdit.module.css';
import * as MemberActions from "../../modules/member";


const UserInfoEdit = (props) => {
  const [imgUrl, setImgUrl] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editPhoneNumber1, setEditPhoneNumber1] = useState('');
  const [editPhoneNumber2, setEditPhoneNumber2] = useState('');
  const [editPhoneNumber3, setEditPhoneNumber3] = useState('');
  const dispatch = useDispatch();
  const memberInfo = useSelector((state) => state.member.memberInfo);
  const memberCheck = useSelector((state) => state.member.checkName);
  const consumerInfo = useSelector((state) => state.consumer);
  const shelterInfo = useSelector((state) => state.shelter);


  const handleChangeImg = (event) => {
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    const formData = new FormData();
    formData.append('file', event.target.files[0])
    if (props.userTypeBoolean) {
      dispatch(postUserProfileImg({
        id: memberInfo.data.memberId,
        formData
      }));
      if (memberInfo.data) { 
        dispatch(getUserInfo(memberInfo.data.memberId));
      }
    } else {
      console.log(shelterInfo.data);
      dispatch(postShelterProfileImg({
        id: memberInfo.data.memberId,
        formData
      }));
      if (memberInfo.data) { 
        dispatch(getShelterInfo(memberInfo.data.memberId));
      }
    }
  };

  const changeEditState = () => {
    props.setEditState(false);
  };

  const submitUserInfo = () => {
    
    const phoneNumber = editPhoneNumber1 + editPhoneNumber2 + editPhoneNumber3;
    if (phoneNumber.length !== 11) {
      alert('핸드폰 번호를 다시 입력하세요');
      return;
    }

    // 새로운 비밀번호가 일치하는지 검사
    // 중복 체크를 했는지 검사

    const data = {
      currentPassword,
      newPassword : password1,
      name : editNickname,
      phoneNumber
    };
    console.log(data);
    if (props.userTypeBoolean) {
      dispatch(putUserInfo(data));
    } else {
      dispatch(putShelterInfo(data));
    }
    
    if (memberInfo.data) { 
      dispatch(getUserInfo(memberInfo.data.memberId));
    }
  };

  const phoneNumberHandler = (e, setNumber) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setNumber(value);
    e.target.value = value;
  }

  const duplicateCheck = () => {
    if (editNickname) {
      dispatch(MemberActions.checkNameAsync.request(editNickname));
      console.log(memberCheck);
    }
  }

  return (
    <div className={styles['user-info-edit']}>
      <div className={styles['user-info-img']}>
        <ImageSmall src={imgUrl || props.userTypeBoolean ? consumerInfo.profileImage : shelterInfo.profileImage} alt={'fakeimgdata'} />
        <label htmlFor="img-file" className={`${styles['user-img-edit-btn']} ${!props.userTypeBoolean && styles['blue-btn']}`}>
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
        className={`${styles['user-input-form']} ${styles['current-pw']} ${!props.userTypeBoolean && styles['blue-line']}`}
        onChange={(e) => {setCurrentPassword(e.target.value);}}
      />
      <input 
        type="password" 
        placeholder="NEW PW" 
        className={`${styles['user-input-form']} ${styles['new-pw']} ${!props.userTypeBoolean && styles['blue-line']} ${password1 !== password2 && styles['error-line']} `} 
        onChange={(e) => {setPassword1(e.target.value);}} 
      />
      <input 
        type="password" 
        placeholder="PW CONFIRM" 
        className={`${styles['user-input-form']} ${styles['new-pw-confirm']} ${!props.userTypeBoolean && styles['blue-line']} ${password1 !== password2 && styles['error-line']}`} 
        onChange={(e) => {setPassword2(e.target.value);}} 
      />
      {
        password1 !== password2 && <div className={styles['pw-confirm-error-message']}>비밀번호가 일치하지 않습니다.</div>
      }
      {props.userTypeBoolean && 
        <div className={styles['nickname-container']}>
          <input 
            type="text" 
            className={`${styles['user-input-form']} ${styles.nickname}`}
            onChange={(e) => {setEditNickname(e.target.value);}}
          />
          <button className={`${styles['nickname-check']} ${memberCheck.data && styles['disable-btn']}`} onClick={duplicateCheck}>중복체크</button>
        </div>
      }
      <div className={styles.phonenumber}>
        <input 
          type="text" 
          maxLength="3" 
          className={`${styles['user-input-form']} ${styles.phonenumber1} ${!props.userTypeBoolean && styles['blue-line']}`} 
          onChange={(e) => {phoneNumberHandler(e, setEditPhoneNumber1)}}
        /> 
        <div className={styles['phonenumber-dash']}>-</div>
        <input 
          type="text" 
          maxLength="4" 
          className={`${styles['user-input-form']} ${styles.phonenumber2} ${!props.userTypeBoolean && styles['blue-line']}`} 
          onChange={(e) => {phoneNumberHandler(e, setEditPhoneNumber2)}}          
        />
        <div className={styles['phonenumber-dash']}>-</div>
        <input 
          type="text" 
          maxLength="4" 
          className={`${styles['user-input-form']} ${styles.phonenumber2} ${!props.userTypeBoolean && styles['blue-line']}`} 
          onChange={(e) => {phoneNumberHandler(e, setEditPhoneNumber3)}}
        />
      </div>
      <div className={styles['edit-btns']}>
        <button className={`${styles['edit-cancel-btn']} ${!props.userTypeBoolean && styles['blue-btn']}`} onClick={changeEditState}>수정취소</button>
        <button className={`${styles['edit-confirm-btn']} ${!props.userTypeBoolean && styles['blue-btn']}`} onClick={submitUserInfo}>수정완료</button>
      </div>
    </div>
  );
};

export default UserInfoEdit;