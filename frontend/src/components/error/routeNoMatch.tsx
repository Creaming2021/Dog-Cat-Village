import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import MemberContainer from "../../containers/memberContainer";
import { ButtonMedium, ModalSmall } from "../common/common";
import styles from "./routeNoMatch.module.css";

type ProtectedRouteProps = {
  Component: () => JSX.Element;
  path: string;
  exact: boolean;
}

export const ProtectedRouteAdmin = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: any) => state.member);

  return (
    member.role === 'ADMIN'
    ? <Component />
    : <RouteNoMatch/>
  );
};

export const ProtectedRouteShelter = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: any) => state.member);

  return (
    member.role === 'SHELTER'
    ? <Component />
    : <RouteNoMatch/>
  );
};

export const ProtectedRouteConsumer = ({ Component }: ProtectedRouteProps) => {
  const member = useSelector((state: any) => state.member);

  return (
    member.role === 'CONSUMER'
    ? <Component />
    : <RouteNoMatch/>
  );
};

export const ProtectedRouteToken = ({ Component }: ProtectedRouteProps) => {
  // 토큰 추출
  // 토큰 유효하면 각 role에 맞춰서 보내기

  return (
    <MemberContainer/> // 지금은 일단 서브메인 화면 띄우기
  );
};

const RouteNoMatch = () => {
  const history = useHistory();

  const onClick = () => {
    history.push("/");
  };

  return (
    <ModalSmall>
      <div className={styles.text}>잘못된 요청 입니다.</div>
      <ButtonMedium
        content="메인으로 가기"
        buttonColor="bg-blue"
        onClick={onClick}
      />
    </ModalSmall>
  );
};

export default RouteNoMatch;
