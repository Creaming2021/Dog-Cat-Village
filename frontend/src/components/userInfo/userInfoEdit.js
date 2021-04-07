import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, postUserProfileImg, putUserInfo } from '../../modules/consumer';
import { getShelterInfo, postShelterProfileImg, putShelterInfo } from '../../modules/shelter';
import { ImageSmall } from '../common/common';
import styles from './userInfoEdit.module.css';
import * as MemberActions from "../../modules/member";


const UserInfoEdit = ({ userTypeBoolean, memberInfo, setEditState, consumerInfo, setProfileImg }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editPhoneNumber1, setEditPhoneNumber1] = useState('');
  const [editPhoneNumber2, setEditPhoneNumber2] = useState('');
  const [editPhoneNumber3, setEditPhoneNumber3] = useState('');
  const dispatch = useDispatch();
  const memberCheck = useSelector((state) => state.member.checkName);
  // const consumerInfo = useSelector((state) => state.consumer);
  const shelterInfo = useSelector((state) => state.shelter);

  useEffect(() => {
    setEditNickname(userTypeBoolean ? consumerInfo.name : shelterInfo.name);
    if (userTypeBoolean && consumerInfo.phoneNumber) {
      setEditPhoneNumber1(consumerInfo.phoneNumber.slice(0,3));
      setEditPhoneNumber2(consumerInfo.phoneNumber.slice(3,7));
      setEditPhoneNumber3(consumerInfo.phoneNumber.slice(7,11));
    } else if (!userTypeBoolean && shelterInfo.phoneNumber) {
      setEditPhoneNumber1(shelterInfo.phoneNumber.slice(0,3));
      setEditPhoneNumber2(shelterInfo.phoneNumber.slice(3,7));
      setEditPhoneNumber3(shelterInfo.phoneNumber.slice(7,11));
    }
  },[]);

  const handleChangeImg = (event) => {
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    setImgFile(event.target.files[0]);
    setProfileImg(URL.createObjectURL(event.target.files[0]));
  };

  const changeEditState = () => {
    setEditState(false);
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
      name: editNickname,
      newPassword: password1,
      phoneNumber,
    };

    console.log(data);

    if (!memberInfo.data) return;

    if (userTypeBoolean) {
      dispatch(putUserInfo({
        id: memberInfo.data.memberId,
        data        
      }));
    } else {
      dispatch(putShelterInfo({
        id: memberInfo.data.memberId,
        data: {
          currentPassword,
          name: editNickname,
          newPassword: password1,
          phoneNumber,
          introduce: shelterInfo.introduce
        }
      }));
    }

    if (imgFile) {
      console.log(imgFile);
      const formData = new FormData();
      formData.append('file', imgFile)
      if (userTypeBoolean) {
        dispatch(postUserProfileImg({
          id: memberInfo.data.memberId,
          formData,
        }));
      } else {
        dispatch(postShelterProfileImg({
          id: memberInfo.data.memberId,
          formData,
        }));
      }
    }
    setImgFile(null);
    setImgUrl('');
    setEditState(false);
  };

  const phoneNumberHandler = (e, setNumber) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setNumber(value);
    e.target.value = value;
  }

  const duplicateCheck = () => {
    if (editNickname) {
      dispatch(MemberActions.checkNameAsync.request(editNickname));
    }
  }

  return (
    <div className={styles['user-info-edit']}>
      <div className={styles['user-info-img']}>
        <ImageSmall src={imgUrl || (userTypeBoolean ? consumerInfo.profileImage : shelterInfo.profileImage) } alt={'fakeimgdata'} />
        <label htmlFor="img-file" className={`${styles['user-img-edit-btn']} ${!userTypeBoolean && styles['blue-btn']}`}>
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
        className={`${styles['user-input-form']} ${styles['current-pw']} ${!userTypeBoolean && styles['blue-line']}`}
        onChange={(e) => {setCurrentPassword(e.target.value);}}
      />
      <input 
        type="password" 
        placeholder="NEW PW" 
        className={`${styles['user-input-form']} ${styles['new-pw']} ${!userTypeBoolean && styles['blue-line']} ${password1 !== password2 && styles['error-line']} `} 
        onChange={(e) => {setPassword1(e.target.value);}} 
      />
      <input 
        type="password" 
        placeholder="PW CONFIRM" 
        className={`${styles['user-input-form']} ${styles['new-pw-confirm']} ${!userTypeBoolean && styles['blue-line']} ${password1 !== password2 && styles['error-line']}`} 
        onChange={(e) => {setPassword2(e.target.value);}} 
      />
      {
        password1 !== password2 && <div className={styles['pw-confirm-error-message']}>비밀번호가 일치하지 않습니다.</div>
      }
      {userTypeBoolean && 
        <div className={styles['nickname-container']}>
          <input 
            type="text" 
            className={`${styles['user-input-form']} ${styles.nickname}`}
            value={editNickname}
            onChange={(e) => {setEditNickname(e.target.value);}}
          />
          <button className={`${styles['nickname-check']} ${memberCheck.data && styles['disable-btn']}`} onClick={duplicateCheck}>중복체크</button>
        </div>
      }
      <div className={styles.phonenumber}>
        <input 
          type="text" 
          maxLength="3"
          className={`${styles['user-input-form']} ${styles.phonenumber1} ${!userTypeBoolean && styles['blue-line']}`} 
          onChange={(e) => {phoneNumberHandler(e, setEditPhoneNumber1)}}
          value={editPhoneNumber1}
        /> 
        <div className={styles['phonenumber-dash']}>-</div>
        <input 
          type="text" 
          maxLength="4" 
          className={`${styles['user-input-form']} ${styles.phonenumber2} ${!userTypeBoolean && styles['blue-line']}`} 
          onChange={(e) => {phoneNumberHandler(e, setEditPhoneNumber2)}}
          value={editPhoneNumber2}
        />
        <div className={styles['phonenumber-dash']}>-</div>
        <input 
          type="text" 
          maxLength="4" 
          className={`${styles['user-input-form']} ${styles.phonenumber2} ${!userTypeBoolean && styles['blue-line']}`} 
          onChange={(e) => {phoneNumberHandler(e, setEditPhoneNumber3)}}
          value={editPhoneNumber3}
        />
      </div>
      <div className={styles['edit-btns']}>
        <button className={`${styles['edit-cancel-btn']} ${!userTypeBoolean && styles['blue-btn']}`} onClick={changeEditState}>수정취소</button>
        <button className={`${styles['edit-confirm-btn']} ${!userTypeBoolean && styles['blue-btn']}`} onClick={submitUserInfo}>수정완료</button>
      </div>
    </div>
  );
};

export default UserInfoEdit;