import React from "react";
import ErrorAlert from "../components/error/errorAlert";

type PasswordContainerProps = {
  match: any;
};

const PasswordContainer = ({ match }: PasswordContainerProps) => {

  
  return (
    <>
      {match.params.auth === "expire" && 
        <ErrorAlert message="비밀번호 변경 기간이 만료 되었습니다."/>}
    </>
  );
};

export default PasswordContainer;
