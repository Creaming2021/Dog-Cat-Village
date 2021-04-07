import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import MemberContainer from "../../containers/memberContainer";
import { RootState } from "../../modules";
import { setMemberInfo } from "../../modules/member";
import { ButtonMedium, ModalSmall } from "../common/common";
import Main from "../shelter/main/main";
import UserMainPage from "../userMainPage/userMainPage";
import styles from "./errorAlert.module.css";

type ProtectedRouteProps = {
  Component: () => JSX.Element;
  path: string;
  exact: boolean;
}

export const ProtectedRouteAdmin = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    member.data?.memberRole === 'ADMIN'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteShelter = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    member.data?.memberRole === 'SHELTER'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteConsumer = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    member.data?.memberRole === 'CONSUMER'
    ? <Component />
    : <ErrorAlert message="잘못된 요청 입니다."/>
  );
};

export const ProtectedRouteToken = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);

  return (
    member.data?.memberRole === 'CONSUMER' 
    ? <UserMainPage/>
    : (member.data?.memberRole === 'SHELTER'
      ? <Main/>
      : <Component/>)
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
