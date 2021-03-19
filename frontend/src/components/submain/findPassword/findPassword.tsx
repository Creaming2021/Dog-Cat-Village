import React, { useState } from 'react';
import styles from './findPassword.module.css';
import commons from '../../common/common.module.css';

type FindPasswordProps = {
    type: string,
    goToJoin: ( type: string ) => void,
    goToLogIn: ( type: string ) => void,
    email: string,
    onChangeFindPassword: (e: React.ChangeEvent<HTMLInputElement>) => void,
    findPW?: () => void,
}

const FindPassword = ({ type, goToJoin, goToLogIn, email, onChangeFindPassword, findPW } : FindPasswordProps) => {
    const onEnter = (e: any) => {
      if(e.keyCode === 13){
        //onSubmitFindPW();
      }
    }

    const onSubmitFindPassword = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log("비밀번호 찾기 요청");
        //findPW();
    }

    return (
    <div className={`${styles['find-password']} 
                    ${type === 'user' ? commons['bg-gradient-yellow-green']
                                    : commons['bg-gradient-green-blue']}`}>
        <div className={`${commons['box-white']} ${styles.box}`}>
            <button 
                className={`${commons['btn-text']} ${commons['text-left']}
                            ${type === 'user'? commons['text-yellow']:commons['text-blue']}`}
                onClick={() => goToLogIn(type)}>로그인 하러 가기</button>
            <button 
                className={`${commons['btn-text']} ${commons['text-right']}
                            ${type === 'user'? commons['text-yellow']:commons['text-blue']}`}
                onClick={() => goToJoin(type)}>회원가입 하러 가기</button>
            <div className={`${commons['text-big']} ${styles['text-main']}`}>
                이메일을<br/>확인하세요
            </div>
            <form onSubmit={onSubmitFindPassword}>
            <input
                className={`${commons['input-big']} ${styles.input}
                            ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                type="email"
                name="email"
                value={email}
                onKeyUp={onEnter}
                onChange={onChangeFindPassword}
                placeholder="이메일"
                /><br/>
            <input 
                type="submit"
                className={`${commons['btn-big']}  ${styles.btn}
                            ${type === 'user'? commons['bg-yellow']:commons['bg-blue']}`}
                onClick={onSubmitFindPassword}
                value="FIND PW"/>
            </form>
            
        </div>
    </div>
    );
}

export default FindPassword;