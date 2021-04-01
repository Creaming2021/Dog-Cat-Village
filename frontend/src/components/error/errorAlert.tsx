import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import MemberContainer from "../../containers/memberContainer";
import { RootState } from "../../modules";
import { ButtonMedium, ModalSmall } from "../common/common";
import styles from "./errorAlert.module.css";

type ProtectedRouteProps = {
  Component: () => JSX.Element;
  path: string;
  exact: boolean;
}

export const ProtectedRouteAdmin = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    member.data && member.data.memberRole[2] === 'ADMIN'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteShelter = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    member.data && member.data.memberRole[0] === 'SHELTER'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteConsumer = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    member.data && member.data.memberRole[0] === 'CONSUMER'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteToken = ({ Component }: ProtectedRouteProps) => {
  // 토큰 추출
  // 토큰 유효하면 각 role에 맞춰서 보내기

  return (
    <MemberContainer/> // 지금은 일단 서브메인 화면 띄우기
  );
};

type ErrorAlertProps = {
  message: string;
}


const ErrorAlert = ({ message }: ErrorAlertProps) => {
  const history = useHistory();

  const onClick = () => {
    history.push("/");
  };

  return (
    <ModalSmall>
      <div className={styles.text}>{message}</div>
      <ButtonMedium
        content="메인으로 가기"
        buttonColor="bg-blue"
        onClick={onClick}
      />
    </ModalSmall>
  );
};

export default ErrorAlert;
