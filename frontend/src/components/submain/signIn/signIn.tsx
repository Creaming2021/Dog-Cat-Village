import React, { useEffect, useState } from "react";
import styles from "./signIn.module.css";
import commons from "../../common/common.module.css";
import { SignInInputType } from "../../../interface/user";
import { ButtonLarge } from "../../common/common";

type SignInProps = {
  type: string;
  goToMain: () => void;
  goToJoin: (type: string) => void;
  goToFindPassword: (type: string) => void;
  signInInput: SignInInputType;
  onChangeSignIn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signIn: () => void;
};

const SignIn = ({
  type,
  goToMain,
  goToJoin,
  goToFindPassword,
  signInInput,
  onChangeSignIn,
  signIn,
}: SignInProps) => {
  // 로그인폼 구성하는 속성들 비구조화 할당
  const { email, password } = signInInput;
  const [ inputState, setInputState ] = useState({email: false, password: false});

  useEffect(() => {
    let ret = validateEmail();
    setInputState({...inputState, email:ret})
  }, [email]);

  useEffect(() => {
    let ret = validatePW();
    setInputState({...inputState, password:ret})
  }, [password]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.key === "Enter") {
      onSubmitSignIn();
    }
  }

  // 로그인 할 조건이 맞는지 확인하는 함수
  const onSubmitSignIn = (): void => {
    if(inputState.email && inputState.password){
      signIn();
    }
  };

  // 이메일 형식 맞는지 확인하는 함수
  const validateEmail = () => {
    if (/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(email)){
      return true;
    }
    return false;
  }

  // 비밀번호 입력했는지 확인하는 함수
  const validatePW = () => {
    if (password === "") {
      return false;
    }
    return true;
  };

  return (
    <div className={`${styles.signIn} ${type === "user" ? styles.dog : styles.cat}`}>
      <div className={`${styles.box} ${styles.left}`}>
        {type === "user" 
        ? (<>
            <div className={`${commons["text-xlarge"]} ${styles["main-text"]}`}>
              당신의 작은 손길,<br />소중한 생명을 살립니다.
            </div>
            <div
              className={`${commons["text-small-light"]} ${styles["sub-text"]}`}
            >
              누구나 언제나 어디서나<br />
              고양이가 보고 싶을 때, 강아지가 보고 싶을 때<br />
              들어오세요!
            </div>
          </>) 
        : (<>
            <div className={`${commons["text-xlarge"]} ${styles["main-text"]}`}>
              보호소의 동물을<br/>도와 드립니다.
            </div>
            <div className={`${commons["text-small-light"]} ${styles["sub-text"]}`}>
              누구나 언제나 어디서나<br />간편하게 시작하세요!
            </div>
          </>
        )}
      </div>
      <div className={`${styles.box} ${styles.right}`}>
        <button
          className={`${commons["btn-text"]} 
                      ${commons["text-left"]}
                      ${type === "user"
                        ? commons["text-yellow"]
                        : commons["text-blue"]}`}
          onClick={goToMain}>
          이전으로</button>
        <button
          className={`${commons["btn-text"]}  
                      ${commons["text-right"]}
                      ${type === "user"
                          ? commons["text-yellow"]
                          : commons["text-blue"]}`}
          onClick={() => goToJoin(type)}>
          회원가입 하러 가기</button>
        <div>
          <input
            className={`${commons["input-large"]} 
                        ${styles.input}
                        ${type === "user"
                        ? commons["border-yellow"]
                        : commons["border-blue"]}`}
            type="text"
            name="email"
            value={email}
            onChange={onChangeSignIn}
            onKeyDown={onKeyDown}
            placeholder="E-mail"/><br/>
          {inputState.email 
          || <div className={commons['text-xsmall-light']}>이메일 형식을 맞춰주세요.</div>}
          <input
            className={`${commons["input-large"]} ${styles.input}
                                ${
                                  type === "user"
                                    ? commons["border-yellow"]
                                    : commons["border-blue"]
                                }`}
            type="password"
            name="password"
            value={password}
            onChange={onChangeSignIn}
            onKeyDown={onKeyDown}
            placeholder="PW"/><br />
          {(inputState.email && !inputState.password)
            && <div className={commons['text-xsmall-light']}>비밀번호를 입력하세요.</div>}
          <button
            className={`${commons["btn-text"]} ${commons["text-left"]}
                                 ${
                                   type === "user"
                                     ? commons["text-yellow"]
                                     : commons["text-blue"]
                                 }`}
            onClick={() => goToFindPassword(type)}>
            비밀번호 찾기</button>
          <button
            className={`${commons["btn-text"]} 
                        ${commons["text-right"]}
                        ${type === "user"
                          ? commons["text-yellow"]
                          : commons["text-blue"]}`}>
            자동 로그인</button> <br />
          <ButtonLarge
            value="LOGIN"
            onClick={onSubmitSignIn}
            buttonColor={type === "user" ? "bg-yellow" : "bg-blue"}/>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
