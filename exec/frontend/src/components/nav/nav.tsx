import React, { useEffect, useState } from "react";
import styles from "./nav.module.css";
import { faUserCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as MemberAction from '../../modules/member';
import { ModalLarge } from "../common/common";
import ChattingContainer from "../../containers/chattingContainer";

type NavProps = {
  role: string;
  memberId: number;
};

const Nav = ({ role, memberId }: NavProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ chatting, setChatting ] = useState(false);
  
  const onClickLogo = () => {
    if(role === 'CONSUMER') {
      history.push('/user');
    } else if(role === 'SHELTER'){
      history.push(`/main`);
    } else if(role === 'ADMIN'){
      history.push('/admin');
    } else if(role === 'MEMBER'){
      history.push('/');
    }
  }

  const onClickChat = () => {
    setChatting(!chatting);
  }

  const onClickLogOut = () => {
    dispatch(MemberAction.signOut());
    history.push('/');
  }

  return (
  <div className={styles.nav}>
    <img 
      src="/images/logo.png" 
      alt="로고" 
      className={styles.logo}
      onClick={onClickLogo}/>
    { role === "SHELTER" && 
      <div className={styles.bar}>
        <div onClick={() => history.push('/main')}>메인 페이지</div>
        <div onClick={() => history.push('/profile')}>마이 페이지</div>
        <div onClick={onClickLogOut}>로그아웃</div>
      </div> 
    }
    { role === "CONSUMER" && <>
      <FontAwesomeIcon 
        icon={faUserCircle} 
        className={styles.icon}
        onClick={() => history.push('/profile')}/>
      <div className={styles.bar}>
        <div onClick={() => history.push('/user')}>홈</div>
        <div onClick={() => history.push('/shelter')}>보호소</div>
        {/* <div onClick={() => history.push('/streaming')}>스트리밍</div> */}
        <div onClick={() => history.push('/pet')}>동물</div>
        <div onClick={onClickChat}>채팅</div>
        <div onClick={onClickLogOut}>로그아웃</div>
      </div>
      </>
    }
    { chatting &&
      <ModalLarge>
        <FontAwesomeIcon 
          icon={faTimesCircle} 
          className={styles['chat-close-icon']}
          onClick={onClickChat}/>
        <ChattingContainer listSet={true}/>
      </ModalLarge>
    }
  </div>);
};

export default Nav;
