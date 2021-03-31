import React from "react";
import styles from "./nav.module.css";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";

type NavProps = {
  role: String;
};

const Nav = ({ role }: NavProps) => {
  const history = useHistory();
  
  const onClickLogo = () => {
    if(role === 'CONSUMER') {
      history.push('/user');
    } else if(role === 'SHELTER'){
      history.push('/main');
    } else if(role === 'ADMIN'){
      history.push('/admin');
    } else if(role === 'MEMBER'){
      history.push('/');
    }
  }

  const onClickChat = () => {
    alert("채팅창 열기");
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
        <div onClick={() => history.push('/streaming')}>스트리밍</div>
        <div onClick={() => history.push('/pet')}>동물</div>
        <div onClick={onClickChat}>채팅</div>
      </div>
      </>
    }
    { role === "ADMIN" &&
      <div className={styles.bar}>
        <div>관리자 네브바 수정할 예정</div>
      </div>
    }
  </div>);
};

export default Nav;
