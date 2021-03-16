import React, { useState } from 'react';
import styles from './logIn.module.css';
import commons from '../../common/common.module.css';

type JoinProps = {
    type: string,
    goToMain: () => void,
    goToJoin: ( type: string ) => void,
    goToFindPassword: ( type: string ) => void,
}

const LogIn = ({ type, goToMain, goToJoin, goToFindPassword } : JoinProps) => {
    type LogInInputType = {
        email: string,
        password: string,
    }

    const initialLogInInput: LogInInputType = {
        email: '',
        password: '',
    }
    
    const [ logInInput, setLogInInput ] = useState<LogInInputType>(initialLogInInput);
    // 로그인폼 구성하는 속성들 비구조화 할당
    const { email, password } = logInInput;

    // 로그인 정보 데이터 수정
    const onChangeLogIn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setLogInInput({ 
            ...logInInput,
            [name]: value});
    }

    const onEnter = (e: any) => {
        if(e.keyCode === 13){
            // onSubmitLogIn(e);
        }
    }

    // 로그인 할 조건이 맞는지 확인하는 함수
    const onSubmitLogIn = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(validatePW(password)){
            console.log("로그인 요청");
        }
    }

    // 비밀번호 입력했는지 확인하는 함수
    const validatePW = (password: string) => {
        if(password === ''){
            alert("비밀번호를 입력하세요.");
            return (false);
        }
        return (true);
    }

    return (
    <div className={`${styles.logIn} ${type === 'user'? styles.dog : styles.cat}`}>
        <div className={`${styles.box} ${styles.left}`}>
            <div className={commons['text-big']}>
                동물과 관련된
            </div>
            <div className={commons['text-big']}>
                공익 느낌의 멘트
            </div>
            <div className={commons['text-middle-light']}>
                오신걸 환영한다는 말과 간단한 서비스 소개</div>
        </div>
        <div className={`${styles.box} ${styles.right}`}>
            <button 
                className={commons['btn-text']}
                onClick={goToMain}>이전으로</button>
            <button 
                className={commons['btn-text']}
                onClick={() => goToJoin(type)}>회원가입 하러 가기</button>
            <form onSubmit={onSubmitLogIn}>
                <input 
                    className={`${commons['input-big']} 
                                ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                    type="email" 
                    name="email"
                    value={email}
                    onChange={onChangeLogIn}  
                    placeholder="E-mail"/><br/>
                <input 
                    className={`${commons['input-big']} 
                                ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                    type="password" 
                    name="password"
                    value={password}
                    onChange={onChangeLogIn} 
                    placeholder="PW"/><br/>
                <button 
                    className={commons['btn-text']}
                    onClick={() => goToFindPassword(type)}>비밀번호 찾기</button>
                <button className={commons['btn-text']}>자동 로그인</button>
                <input 
                    type="submit"
                    className={`${commons['btn-big']} 
                                ${type === 'user'? commons['bg-yellow']:commons['bg-blue']}`}
                    onClick={onSubmitLogIn}
                    value="LOGIN"/>
            </form>
        </div>
    </div>);
}

export default LogIn;