import React, { useEffect, useState } from "react";
import styles from "./signUp.module.css";
import commons from "../../common/common.module.css";
import { SignUpInputType } from "../../../interface/member";
import SignUpForm from './signUpForm';
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SignUpProps = {
  type: string;
  goToLogIn: (type: string) => void;
  signUpInput: SignUpInputType;
  onChangeSignUp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signUp: () => void;
  checkName: () => boolean;
};

const SignUp = ({
  type,
  goToLogIn,
  signUpInput,
  onChangeSignUp,
  signUp,
  checkName,
}: SignUpProps) => {
  const [ inputState, setInputState ] = useState({
    email: false, 
    password: false, 
    passwordConfirm: false, 
    duplicated: false, 
    phoneNumber: false
  });

  // 회원가입폼 구성하는 속성들 비구조화 할당
  const {
    emailId,
    emailSite,
    password,
    passwordConfirm,
    phoneNumber1,
    phoneNumber2,
    phoneNumber3,
    name,
  } = signUpInput;

  useEffect(() => {
    setInputState({ ...inputState, email: validateEmail()});
  }, [emailId, emailSite]);

  useEffect(() => {
    setInputState({ ...inputState, password: validatePW(), passwordConfirm: validatePWConfirm()});
  }, [password, passwordConfirm]);

  useEffect(() => {
    setInputState({ ...inputState, duplicated: false});
  }, [name]);

  useEffect(() => {
    setInputState({ ...inputState, phoneNumber: validatePhoneNumber()});
  }, [phoneNumber1, phoneNumber2, phoneNumber3]);

  // 엔터키 입력 처리 함수
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.nativeEvent.key === "Enter") {
      onSubmitSignUp();
    }
  }

  // 회원가입 할 조건이 맞는지 확인하는 함수
  const onSubmitSignUp = (): void => {
    if ( inputState.email && inputState.password
      && inputState.passwordConfirm && inputState.duplicated
      && inputState.phoneNumber) {
        signUp();
    }
  };

  // 이메일 양식 확인하는 함수
  const validateEmail = (): boolean => {
    if(emailId.length == 0 || emailSite.length == 0) return false;
    else { return /^([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(emailSite); }
  }

  // 비밀번호 입력이 맞는지 확인하는 함수
  const validatePW = (): boolean => {
    return /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
  };

  // 비밀번호 확인이 동일한지 확인하는 함수
  const validatePWConfirm = (): boolean => {
    if (password.length === 0 || passwordConfirm.length === 0) return false;
    else return password === passwordConfirm;
  };

  // 중복 체크 하는 함수
  const onCheckDuplicated = (): void => {
    setInputState({ ...inputState, duplicated: checkName()});
  }

  // 핸드폰 번호 양식 확인하는 함수
  const validatePhoneNumber = (): boolean => {
    if(phoneNumber1.length === 3 
      && phoneNumber2.length === 4 
      && phoneNumber3.length === 4) 
        return true;
    else return false;
  }

  return (
  <div className={`${styles['sign-up-container']} 
                ${ type === "CONSUMER"
                  ? commons["bg-gradient-yellow-green"]
                  : commons["bg-gradient-green-blue"]}`}>
    <div className={`${commons["box-white"]} ${styles['left-container']}`}>
      <button
        className={`${commons["btn-text"]} 
                    ${commons["text-right"]} 
                    ${styles.button}
                    ${type === "CONSUMER"
                      ? commons["text-yellow"]
                      : commons["text-blue"]}`}
        onClick={() => goToLogIn(type)}>
        로그인 하러 가기</button>
      <SignUpForm
        type={type}
        signUpInput={signUpInput}
        inputState={inputState}
        onChangeSignUp={onChangeSignUp}
        onKeyDown={onKeyDown}
        onCheckDuplicated={onCheckDuplicated}
        onSubmitSignUp={onSubmitSignUp} />
    </div>
    <div className={`${styles['right-container']}`}>
      <div>
        <div className={`${commons['text-medium-bold']}`}>멍냥이 빌리지에 오신 걸</div>
        <p className={`${commons['text-large']}`}>환영합니다!</p>
      </div>
      <div>
        <div className={`${commons['text-small-light']}`}><FontAwesomeIcon icon={faPaw}/> 즐겁게</div>
        <div className={`${commons['text-small-light']}`}><FontAwesomeIcon icon={faPaw}/> 편리하게</div>
        <div className={`${commons['text-small-light']}`}><FontAwesomeIcon icon={faPaw}/> 안전하게</div>
        <div className={`${commons['text-small-light']}`}><FontAwesomeIcon icon={faPaw}/> 간편하게</div>
      </div>
      { type === 'CONSUMER'
        ? <p className={`${commons['text-medium-light']}`}>후원하세요!</p>
        : <p className={`${commons['text-medium-light']}`}>시작하세요!</p> }
    </div>
  </div>
  );
};

export default SignUp;
