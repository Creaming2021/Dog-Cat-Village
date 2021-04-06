import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import MemberContainer from "../../containers/memberContainer";
import { RootState } from "../../modules";
import { setMemberInfo } from "../../modules/member";
import { ButtonMedium, ModalSmall } from "../common/common";
import styles from "./errorAlert.module.css";

const TokenCheck = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('access_token');

  if(token){
    // dispatch(setMemberInfo());
    return true;
  } else{
    return false;
  }
}

type ProtectedRouteProps = {
  Component: () => JSX.Element;
  path: string;
  exact: boolean;
}

export const ProtectedRouteAdmin = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    TokenCheck() && member.data?.memberRole === 'ADMIN'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteShelter = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    TokenCheck() && member.data?.memberRole === 'SHELTER'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteConsumer = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    TokenCheck() && member.data?.memberRole === 'CONSUMER'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteToken = ({ Component }: ProtectedRouteProps) => {
  return (
    TokenCheck() 
    ? <Component />
    : <MemberContainer/> // 지금은 일단 서브메인 화면 띄우기
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
