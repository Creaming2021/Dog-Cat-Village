import React, { useState } from 'react';
import styles from './findPassword.module.css';
import commons from '../../common/common.module.css';

type FindPasswordProps = {
    type: string,
    goToJoin: ( type: string ) => void,
    goToLogIn: ( type: string ) => void,
}

const FindPassword = ({ type, goToJoin, goToLogIn } : FindPasswordProps) => {
    const initialFindPasswordInput: string = '';

    const [ email, setEmail ] = useState<string>(initialFindPasswordInput);

    // 이메일 정보 데이터 수정
    const onChangeFindPassword = (e:any) => {
        const { value } = e.target;

        setEmail(value);
    }

    const onEnter = (e: any) => {
      if(e.keyCode === 13){
        //onSubmitFindPW();
      }
    }

    const onSubmitFindPassword = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log("비밀번호 찾기 요청");
    }

    return (
    <div className={`${styles['find-password']} 
                    ${type === 'user' ? commons['bg-gradient-yellow-green']
                                    : commons['bg-gradient-green-blue']}`}>
        <button 
            className={commons['btn-text']}
            onClick={() => goToLogIn(type)}>로그인 하러 가기</button>
        <button 
            className={commons['btn-text']}
            onClick={() => goToJoin(type)}>회원가입 하러 가기</button>
        <div className={commons['text-big']}>
            이메일을
        </div>
        <div className={commons['text-big']}>
            확인하세요
        </div>
        <form onSubmit={onSubmitFindPassword}>
        <input
            className={`${commons['input-big']} 
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
            className={`${commons['btn-big']} 
                        ${type === 'user'? commons['bg-yellow']:commons['bg-blue']}`}
            onClick={onSubmitFindPassword}
            value="FIND PW"/>
        </form>
    </div>
    );
}

export default FindPassword;