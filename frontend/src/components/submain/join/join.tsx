import React, { useEffect, useState } from 'react';
import styles from './join.module.css';
import commons from '../../common/common.module.css';

type JoinProps = {
    type: string,
    goToLogIn: ( type: string ) => void,
}

const Join = ({ type, goToLogIn } : JoinProps) => {
    type JoinInputType = {
        emailId: string,
        emailSite: string,
        nickname: string,
        password: string,
        passwordConfirm: string,
        phoneNumber1: string,
        phoneNumber2: string,
        phoneNumber3: string,
    }

    const initialJoinInputType: JoinInputType = {
        emailId: '',
        emailSite: '',
        nickname: '',
        password: '',
        passwordConfirm: '',
        phoneNumber1: '',
        phoneNumber2: '',
        phoneNumber3: '',
    }

    const [joinInput, setJoinInput ] = useState<JoinInputType>(initialJoinInputType);
    const [passwordCheck, setPasswordCheck ] = useState<boolean>(false);
    // 회원가입폼 구성하는 속성들 비구조화 할당
    const { emailId, emailSite, nickname, password, 
        passwordConfirm, phoneNumber1, phoneNumber2, phoneNumber3 } = joinInput;
    

    // 회원가입 정보 데이터 수정
    const onChangeJoin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setJoinInput({
            ...joinInput,
            [name]: value,
        })
    }

    const onEnter = (e: any) => {
        if(e.keyCode === 13){
            // onSubmitSignUp(e);
        }
    }

    // 비밀번호를 입력할 때마다 비교하는 함수
    useEffect(() => {
        validatePWConfirm();
    }, [ password, passwordConfirm ]);

    // 회원가입 할 조건이 맞는지 확인하는 함수
    const onSubmitSignUp = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(validateNickName(nickname)   
            && validatePW(password) 
            && passwordCheck ){
                console.log("회원가입 요청");
        }
    }

    // 닉네임 입력했는지 확인하는 함수
    const validateNickName = (nickname: string): boolean => {
        if(nickname.length > 0){
            return true;
        } else {
            alert("닉네임을 입력해주세요.");
            return false;
        }
    }

    // 비밀번호 입력했는지 확인하는 함수
    const validatePW = (password: string): boolean => {
        if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password)){
            alert("비밀번호는 숫자, 영문자, 특수문자 조합으로 8자리 이상 이여야 합니다.");
            return false;
        }else {
            return true;
        } 
    }

    // 비밀번호 확인이 동일한지 확인하는 함수
    const validatePWConfirm = () => {
        if(password.length === 0 || passwordConfirm.length === 0) {
            setPasswordCheck(false);
        } else if(password === passwordConfirm) {
            setPasswordCheck(true);
        } else{
            setPasswordCheck(false);
        }
    }

    return (
    <div className={`${styles.join} 
                    ${type === 'user' ? commons['bg-gradient-yellow-green']
                                    : commons['bg-gradient-green-blue']}`}>
        <button 
                className={commons['btn-text']}
                onClick={() => goToLogIn(type)}>로그인 하러 가기</button>
        <form onSubmit={onSubmitSignUp}>
            <input  
                className={`${commons['input-small']} 
                            ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                type="text"
                name="emailId" 
                value={emailId}
                onChange={onChangeJoin} 
                placeholder="이메일"/>
            <div className={styles['icon-at']}>@</div>
            <input  
                className={`${commons['input-small']} 
                            ${type === 'user'? commons['border-yellow']:commons['border-blue']}`} 
                type="text"
                name="emailSite" 
                value={emailSite} 
                onChange={onChangeJoin} 
                placeholder="직접입력"/><br/>
            <input 
                className={`${commons['input-big']} 
                            ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                type="text"
                name="nickname" 
                value={nickname}
                onChange={onChangeJoin} 
                placeholder="닉네임"/><br/>
            <input 
                className={`${commons['input-big']} 
                            ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                type="password"
                name="password" 
                value={password} 
                onChange={onChangeJoin} 
                placeholder="비밀번호"/><br/>
            <input  
                className={`${commons['input-big']} 
                            ${type === 'user'? commons['border-yellow']:commons['border-blue']}`}
                type="password"
                name="passwordConfirm" 
                value={passwordConfirm}
                onChange={onChangeJoin} 
                placeholder="비밀번호 확인"/>

            {passwordCheck
                ? <p className={styles.comment_confirm_PW}>
                    비밀번호가 일치합니다.</p>
                : <p className={styles.comment_confirm_PW}>
                    비밀번호가 일치하지 않습니다.</p>
            }
            
            <input
                type="submit"
                className={`${commons['btn-big']} 
                            ${type === 'user'? commons['bg-yellow']:commons['bg-blue']}`}
                onClick={onSubmitSignUp}
                value="SIGN IN"/>
        </form>
    </div>
    );
}

export default Join;