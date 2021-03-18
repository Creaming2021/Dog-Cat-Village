import React, { useState } from 'react';
import styles from './signIn.module.css';
import commons from '../../common/common.module.css';
import { SignInInputType } from '../../../interface/user';

type SignInProps = {
    type: string,
    goToMain: () => void,
    goToJoin: ( type: string ) => void,
    goToFindPassword: ( type: string ) => void,
    signInInput: SignInInputType,
    onChangeSignIn: ( e: React.ChangeEvent<HTMLInputElement>) => void,
    signIn: () => void,
}

const SignIn = ({ type, goToMain, goToJoin, goToFindPassword, signInInput, onChangeSignIn, signIn } : SignInProps) => {
    // 로그인폼 구성하는 속성들 비구조화 할당
    const { email, password } = signInInput;
    
    // const onEnter = (e: any) => {
    //     if(e.keyCode === 13){
    //         // onSubmitLogIn(e);
    //     }
    // }

    // 로그인 할 조건이 맞는지 확인하는 함수
    const onSubmitLogIn = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(validatePW(password)){
            signIn();
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
            <div className={`${commons['text-xbig']} ${styles['main-text']}`}>
                동물과 관련된<br/>
                공익 느낌의 멘트
            </div>
            <div className={`${commons['text-small-light']} ${styles['sub-text']}`}>
                오신걸 환영한다는 말과 간단한 서비스 소개<br/>
                오신걸 환영한다는 말과<br/> 간단한 서비스 소개 오신걸 환영한다
            </div>
        </div>
        <div className={`${styles.box} ${styles.right}`}>
            <button 
                className={`${commons['btn-text']} ${commons['text-left']}
                            ${type === 'user'? commons['text-yellow']:commons['text-blue']}`}
                onClick={goToMain}>이전으로</button>
            <button 
                className={`${commons['btn-text']}  ${commons['text-right']}
                            ${type === 'user'? commons['text-yellow']:commons['text-blue']}`}
                onClick={() => goToJoin(type)}>회원가입 하러 가기</button>
            <form onSubmit={onSubmitLogIn}>
                <input 
                    className={`${commons['input-big']} ${styles.input}
                                ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                    type="email" 
                    name="email"
                    value={email}
                    onChange={onChangeSignIn}  
                    placeholder="E-mail"/><br/>
                <input 
                    className={`${commons['input-big']} ${styles.input}
                                ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                    type="password" 
                    name="password"
                    value={password}
                    onChange={onChangeSignIn} 
                    placeholder="PW"/><br/>
                <button 
                    className={`${commons['btn-text']} ${commons['text-left']}
                                 ${type === 'user'? commons['text-yellow']:commons['text-blue']}`} 
                    onClick={() => goToFindPassword(type)}>비밀번호 찾기</button>
                <button className={`${commons['btn-text']} ${commons['text-right']}
                                ${type === 'user'? commons['text-yellow']:commons['text-blue']}`}>자동 로그인</button><br/>
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

export default SignIn;