import React, { useEffect, useState } from "react";
import styles from "./signUp.module.css";
import commons from "../../common/common.module.css";
import { SignUpInputType } from "../../../interface/user";
import { ButtonLarge } from "../../common/common";

type SignUpProps = {
  type: string;
  goToLogIn: (type: string) => void;
  signUpInput: SignUpInputType;
  onChangeSignUp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signUp: () => void;
  checkNickname?: () => boolean;
  checkName?: () => boolean;
};

const SignUp = ({
  type,
  goToLogIn,
  signUpInput,
  onChangeSignUp,
  signUp,
  checkNickname,
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
    nickname,
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
  }, [nickname, name]);

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
  const onCheckNickname = (): void => {
    if(type === 'user' && checkNickname){
      setInputState({ ...inputState, duplicated: checkNickname()});
    }else if(type === 'center' && checkName) {
      setInputState({ ...inputState, duplicated: checkName()});
    }
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
    <div
      className={`${styles.join} 
                    ${ type === "user"
                      ? commons["bg-gradient-yellow-green"]
                      : commons["bg-gradient-green-blue"]}`}>
      <div className={`${commons["box-white"]} ${styles.box}`}>
        <button
          className={`${commons["btn-text"]} 
                      ${commons["text-right"]} 
                      ${styles.button}
                      ${type === "user"
                        ? commons["text-yellow"]
                        : commons["text-blue"]}`}
          onClick={() => goToLogIn(type)}>
          로그인 하러 가기</button>
        <div className={styles.form}>
          <input
            className={`${commons["input-small"]} 
                        ${styles.input}
                        ${type === "user"
                          ? commons["border-yellow"]
                          : commons["border-blue"]}`}
            type="text"
            name="emailId"
            value={emailId}
            onChange={onChangeSignUp}
            onKeyDown={onKeyDown}
            placeholder="E-mail"/>
          <div className={styles["icon-at"]}>@</div>
          <input
            className={`${commons["input-small"]} 
                        ${styles.input}
                        ${type === "user"
                          ? commons["border-yellow"]
                          : commons["border-blue"]}`}
            type="text"
            name="emailSite"
            value={emailSite}
            onChange={onChangeSignUp}
            onKeyDown={onKeyDown}
            placeholder="xxx.xxx"/><br/>
          {inputState.email || (
            <p className={styles['text-xsmall-light']}>
              이메일을 입력하세요.</p>)}
          <input
            className={`${commons["input-large"]} 
                        ${styles.input}
                        ${type === "user"
                          ? commons["border-yellow"]
                          : commons["border-blue"]}`}
            type="password"
            name="password"
            value={password}
            onChange={onChangeSignUp}
            onKeyDown={onKeyDown}
            placeholder="PW"/><br />
          {inputState.password || (
            <p className={styles['text-xsmall-light']}>
              비밀번호는 숫자, 영문자, 특수문자 조합으로 8자리 이상 이여야 합니다.</p>)}
          <input
            className={`${commons["input-large"]} 
                        ${styles.input}
                        ${type === "user"
                          ? commons["border-yellow"]
                          : commons["border-blue"]}`}
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangeSignUp}
            placeholder="PW CONFIRM"/><br />
          {inputState.passwordConfirm || (
            <p className={styles['text-xsmall-light']}>비밀번호가 일치하지 않습니다.</p>)}
          {type === "user" 
          ? (<>
              <input
                className={`${styles["input-nickname"]} 
                            ${styles.input}
                            ${type === "user"
                              ? commons["border-yellow"]
                              : commons["border-blue"]}`}
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChangeSignUp}
                onKeyDown={onKeyDown}
                placeholder="NICKNAME"/>
              <button
                className={`${styles['btn-check']} 
                          ${type === "user"
                            ? commons["bg-white-yellow"]
                            : commons["bg-white-blue"]}`}
                name="duplication"
                onClick={onCheckNickname}>중복 확인</button><br />
            </>) 
          : (<>
              <input
                className={`${styles["input-nickname"]} 
                            ${styles.input}
                            ${type === "user"
                              ? commons["border-yellow"]
                              : commons["border-blue"]}`}
                type="text"
                name="name"
                value={name}
                onChange={onChangeSignUp}
                onKeyDown={onKeyDown}
                placeholder="단체명"/>
              <button
                className={`${styles['btn-check']} 
                          ${type === "user"
                            ? commons["bg-white-yellow"]
                            : commons["bg-white-blue"]}`}
                name="duplication"
                onClick={onCheckNickname}>중복 확인</button><br />
            </>)}
          {inputState.duplicated || (
            <p className={styles['text-xsmall-light']}>중복 확인을 하세요.</p>)}
          <input
            className={`${commons["input-xsmall"]} 
                        ${styles.input}
                        ${type === "user"
                          ? commons["border-yellow"]
                          : commons["border-blue"]}`}
            type="text"
            name="phoneNumber1"
            value={phoneNumber1}
            onChange={onChangeSignUp}
            onKeyDown={onKeyDown}
            placeholder="010"/>
          -
          <input
            className={`${commons["input-xsmall"]} 
                        ${styles.input}
                        ${type === "user"
                          ? commons["border-yellow"]
                          : commons["border-blue"]}`}
            type="text"
            name="phoneNumber2"
            value={phoneNumber2}
            onChange={onChangeSignUp}
            onKeyDown={onKeyDown}
            placeholder="1234"
          />
          -
          <input
            className={`${commons["input-xsmall"]} 
                        ${styles.input}
                        ${type === "user"
                          ? commons["border-yellow"]
                          : commons["border-blue"]}`}
            type="text"
            name="phoneNumber3"
            value={phoneNumber3}
            onChange={onChangeSignUp}
            onKeyDown={onKeyDown}
            placeholder="5678"/><br />
          {inputState.phoneNumber || (
            <p className={styles['text-xsmall-light']}>번호를 확인하세요.</p>)}
          <ButtonLarge
            value="SIGN IN"
            onClick={onSubmitSignUp}
            buttonColor={type === "user" ? "bg-yellow" : "bg-blue"}/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
