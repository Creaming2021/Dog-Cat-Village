import React, { useEffect, useState } from "react";
import styles from "./setPassword.module.css";
import commons from "../../common/common.module.css";
import { ButtonLarge } from "../../common/common";

type SetPasswordProps = {
  password: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPassword: () => void;
};

const SetPassword = ({
  password,
  onChangePassword,
  setPassword,
}: SetPasswordProps) => {
  const [passwordConfirm, setPasswordConfirm] = useState({
    input: '',
    valid: false,
  });

  useEffect(() => {
    setPasswordConfirm({
      ...passwordConfirm,
      valid: validatePWConfirm(),
    })
  }, [passwordConfirm.input]);

  // 비밀번호 확인 입력 변화
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordConfirm({
      ...passwordConfirm,
      input: value,
    });
  }

  // 엔터키 입력 처리 함수
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.nativeEvent.key === "Enter") {
      onSubmitSetPassword();
    }
  }

  const onSubmitSetPassword = () => {
    if(validatePW() && passwordConfirm.valid) {
      setPassword();
    }
  };

  // 비밀번호 입력이 맞는지 확인하는 함수
  const validatePW = (): boolean => {
    return /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
  };

  // 비밀번호 확인이 동일한지 확인하는 함수
  const validatePWConfirm = (): boolean => {
    if (password.length === 0 || passwordConfirm.input.length === 0) return false;
    else return password === passwordConfirm.input;
  };

  return (
    <div
      className={`${styles["set-password-container"]} ${commons["bg-gradient-yellow-blue"]}`}>
      <div className={`${commons["box-white"]} ${styles.box}`}>
        <div className={`${commons["text-large"]} ${styles["text-main"]}`}>
          새로운 비밀번호를<br />입력하세요
        </div>
        <div className={`${styles['input-container']}`}>
          <input
            className={`${commons["input-large"]} 
                        ${styles.input}
                        ${commons["border-blue"]}`}
            type="password"
            value={password}
            onKeyDown={onKeyDown}
            onChange={onChangePassword}
            placeholder="PW"/>
          {password.length > 0 || (
            <p className={styles['text-xsmall-light']}>
              비밀번호는 숫자, 영문자, 특수문자 조합으로 8자리 이상 이여야 합니다.</p>)}
          <input
            className={`${commons["input-large"]} 
                        ${styles.input}
                        ${commons["border-blue"]}`}
            type="password"
            value={passwordConfirm.input}
            onKeyDown={onKeyDown}
            onChange={onChange}
            placeholder="PW CONFIRM"/>
          {passwordConfirm.valid || (
            <p className={styles['text-xsmall-light']}>
              비밀번호가 일치하지 않습니다.</p>)}
        </div>
        <ButtonLarge
            content="FIND PW"
            onClick={onSubmitSetPassword}
            buttonColor="bg-blue"/>
      </div>
    </div>
  );
};

export default SetPassword;
