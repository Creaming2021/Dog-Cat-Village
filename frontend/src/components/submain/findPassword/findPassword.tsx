import React, { useEffect, useState } from "react";
import styles from "./findPassword.module.css";
import commons from "../../common/common.module.css";
import { ButtonLarge } from "../../common/common";

type FindPasswordProps = {
  type: string;
  goToJoin: (type: string) => void;
  goToLogIn: (type: string) => void;
  email: string;
  onChangeFindPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  findPW: () => void;
};

const FindPassword = ({
  type,
  goToJoin,
  goToLogIn,
  email,
  onChangeFindPassword,
  findPW,
}: FindPasswordProps) => {
  const [inputState, setInputState] = useState(false);

  useEffect(() => {
    setInputState(validateEmail());
  }, [email]);
  
  // 엔터키 입력 처리 함수
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.nativeEvent.key === "Enter") {
      onSubmitFindPassword();
    }
  }

  const onSubmitFindPassword = () => {
    if(inputState) {
      findPW();
    }
  };

  // 이메일 형식 맞는지 확인하는 함수
  const validateEmail = (): boolean => {
    if (/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(email)){
      return true;
    }
    return false;
  }


  return (
    <div
      className={`${styles["find-password"]} 
                  ${type === "CONSUMER"
                    ? commons["bg-gradient-yellow-green"]
                    : commons["bg-gradient-green-blue"]}`}>
      <div className={`${commons["box-white"]} ${styles.box}`}>
        <button
          className={`${styles['btn-text']}
                      ${commons["btn-text"]} 
                      ${commons["text-left"]}
                      ${type === "CONSUMER"
                        ? commons["text-yellow"]
                        : commons["text-blue"]}`}
          onClick={() => goToLogIn(type)}>
          로그인 하러 가기</button>
        <button
          className={`${styles['btn-text']}
                      ${commons["btn-text"]} 
                      ${commons["text-right"]}
                      ${type === "CONSUMER"
                        ? commons["text-yellow"]
                        : commons["text-blue"]}`}
          onClick={() => goToJoin(type)}>
          회원가입 하러 가기</button>
        <div className={`${commons["text-large"]} ${styles["text-main"]}`}>
          이메일을<br />확인하세요
        </div>
        <div className={`${styles['input-container']}`}>
          <input
            className={`${commons["input-large"]} 
                        ${styles.input}
                        ${type === "CONSUMER"
                          ? commons["border-yellow"]
                          : commons["border-blue"]}`}
            type="email"
            name="email"
            value={email}
            onKeyDown={onKeyDown}
            onChange={onChangeFindPassword}
            placeholder="이메일"/>
          {inputState || (
            <p className={styles['text-xsmall-light']}>이메일 주소를 확인하세요.</p>)}
        </div>
        <ButtonLarge
            content="FIND PW"
            onClick={onSubmitFindPassword}
            buttonColor={type === "CONSUMER" ? "bg-yellow" : "bg-blue"}/>
      </div>
    </div>
  );
};

export default FindPassword;
