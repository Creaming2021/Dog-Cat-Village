import React, { useEffect, useState } from "react";
import styles from "./signUp.module.css";
import commons from "../../common/common.module.css";
import { SignUpInputType } from "../../../interface/user";

type SignUpProps = {
  type: string;
  goToLogIn: (type: string) => void;
  signUpInput: SignUpInputType;
  onChangeSignUp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signUp: () => void;
  checkNickname: () => void;
};

const SignUp = ({
  type,
  goToLogIn,
  signUpInput,
  onChangeSignUp,
  signUp,
  checkNickname,
}: SignUpProps) => {
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);

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

  // const onEnter = (e: any) => {
  //     if(e.keyCode === 13){
  //         // onSubmitSignUp(e);
  //     }
  // }

  // 비밀번호를 입력할 때마다 비교하는 함수
  useEffect(() => {
    validatePWConfirm();
  }, [password, passwordConfirm]);

  // 회원가입 할 조건이 맞는지 확인하는 함수
  const onSubmitSignUp = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (e.currentTarget.name === "duplication") {
      checkNickname();
    } else if (
      validateNickName(nickname || " ") &&
      validatePW(password) &&
      passwordCheck
    ) {
      signUp();
    }
  };

  // 닉네임 입력했는지 확인하는 함수
  const validateNickName = (nickname: string): boolean => {
    if (nickname.length > 0) {
      return true;
    } else {
      alert("닉네임을 입력해주세요.");
      return false;
    }
  };

  // 비밀번호 입력했는지 확인하는 함수
  const validatePW = (password: string): boolean => {
    if (
      !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password)
    ) {
      alert(
        "비밀번호는 숫자, 영문자, 특수문자 조합으로 8자리 이상 이여야 합니다."
      );
      return false;
    } else {
      return true;
    }
  };

  // 비밀번호 확인이 동일한지 확인하는 함수
  const validatePWConfirm = () => {
    if (password.length === 0 || passwordConfirm.length === 0) {
      setPasswordCheck(false);
    } else if (password === passwordConfirm) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  };

  return (
    <div
      className={`${styles.join} 
                    ${
                      type === "user"
                        ? commons["bg-gradient-yellow-green"]
                        : commons["bg-gradient-green-blue"]
                    }`}
    >
      <div className={`${commons["box-white"]} ${styles.box}`}>
        <button
          className={`${commons["btn-text"]} ${commons["text-right"]} ${
            styles.button
          }
                                ${
                                  type === "user"
                                    ? commons["text-yellow"]
                                    : commons["text-blue"]
                                }`}
          onClick={() => goToLogIn(type)}
        >
          로그인 하러 가기
        </button>
        <form onSubmit={onSubmitSignUp} className={styles.form}>
          <input
            className={`${commons["input-small"]} ${styles.input}
                                ${
                                  type === "user"
                                    ? commons["border-yellow"]
                                    : commons["border-blue"]
                                }`}
            type="text"
            name="emailId"
            value={emailId}
            onChange={onChangeSignUp}
            placeholder="E-mail"
          />
          <div className={styles["icon-at"]}>@</div>
          <input
            className={`${commons["input-small"]} ${styles.input}
                                ${
                                  type === "user"
                                    ? commons["border-yellow"]
                                    : commons["border-blue"]
                                }`}
            type="text"
            name="emailSite"
            value={emailSite}
            onChange={onChangeSignUp}
            placeholder="xxx.com"
          />
          <br />
          <input
            className={`${commons["input-big"]} ${styles.input}
                                ${
                                  type === "user"
                                    ? commons["border-yellow"]
                                    : commons["border-blue"]
                                }`}
            type="password"
            name="password"
            value={password}
            onChange={onChangeSignUp}
            placeholder="PW"
          />
          <br />
          <input
            className={`${commons["input-big"]} ${styles.input}
                                ${
                                  type === "user"
                                    ? commons["border-yellow"]
                                    : commons["border-blue"]
                                }`}
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangeSignUp}
            placeholder="PW CONFIRM"
          />
          <br />
          {passwordCheck || (
            <p className={styles.red}>비밀번호가 일치하지 않습니다.</p>
          )}
          {type === "user" ? (
            <>
              <input
                className={`${styles["input-nickname"]} ${styles.input}
                                    ${
                                      type === "user"
                                        ? commons["border-yellow"]
                                        : commons["border-blue"]
                                    }`}
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChangeSignUp}
                placeholder="NICKNAME"
              />
              <button
                className={styles["btn-check"]}
                name="duplication"
                onClick={onSubmitSignUp}
              >
                중복 확인
              </button>
              <br />
            </>
          ) : (
            <>
              <input
                className={`${commons["input-big"]} ${styles.input}
                                    ${
                                      type === "user"
                                        ? commons["border-yellow"]
                                        : commons["border-blue"]
                                    }`}
                type="text"
                name="name"
                value={name}
                onChange={onChangeSignUp}
                placeholder="단체명"
              />
              <br />
            </>
          )}
          <input
            className={`${commons["input-xsmall"]} ${styles.input}
                                ${
                                  type === "user"
                                    ? commons["border-yellow"]
                                    : commons["border-blue"]
                                }`}
            type="text"
            name="phoneNumber1"
            value={phoneNumber1}
            onChange={onChangeSignUp}
            placeholder="010"
          />
          -
          <input
            className={`${commons["input-xsmall"]} ${styles.input}
                                ${
                                  type === "user"
                                    ? commons["border-yellow"]
                                    : commons["border-blue"]
                                }`}
            type="text"
            name="phoneNumber2"
            value={phoneNumber2}
            onChange={onChangeSignUp}
            placeholder="1234"
          />
          -
          <input
            className={`${commons["input-xsmall"]} ${styles.input}
                                ${
                                  type === "user"
                                    ? commons["border-yellow"]
                                    : commons["border-blue"]
                                }`}
            type="text"
            name="phoneNumber3"
            value={phoneNumber3}
            onChange={onChangeSignUp}
            placeholder="5678"
          />
          <br />
          <input
            type="submit"
            className={`${commons["btn-big"]} ${styles.btn}
                                ${
                                  type === "user"
                                    ? commons["bg-yellow"]
                                    : commons["bg-blue"]
                                }`}
            onClick={onSubmitSignUp}
            value="SIGN IN"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
