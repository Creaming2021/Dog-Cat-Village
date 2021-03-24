import React from "react";
import styles from "./signUp.module.css";
import commons from "../../common/common.module.css";
import { SignUpInputType } from "../../../interface/user";
import { ButtonLarge } from "../../common/common";

type SignUpFormProps = {
  type: string;
  signUpInput: SignUpInputType;
  inputState: {
    email: boolean, 
    password: boolean, 
    passwordConfirm: boolean, 
    duplicated: boolean, 
    phoneNumber: boolean
  },
  onChangeSignUp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCheckDuplicated: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmitSignUp: () => void;
}

const SignUpForm = ({
  type,
  signUpInput,
  inputState,
  onChangeSignUp,
  onKeyDown,
  onCheckDuplicated,
  onSubmitSignUp,
}: SignUpFormProps) => {

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

  return (
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
    <input
      className={`${styles["input-nickname"]} 
                  ${styles.input}
                  ${type === "user"
                    ? commons["border-yellow"]
                    : commons["border-blue"]}`}
      type="text"
      name={type === 'user'? "nickname" : "name"}
      value={type === 'user'? nickname : name}
      onChange={onChangeSignUp}
      onKeyDown={onKeyDown}
      placeholder={type === 'user'? "NICKNAME" : "단체명"}/>
    <button
      className={`${styles['btn-check']} 
                ${type === "user"
                  ? commons["bg-white-yellow"]
                  : commons["bg-white-blue"]}`}
      name="duplication"
      onClick={onCheckDuplicated}>중복 확인</button><br />
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
      content="SIGN IN"
      onClick={onSubmitSignUp}
      buttonColor={type === "user" ? "bg-yellow" : "bg-blue"}/>
  </div> 
  );
}

export default SignUpForm;