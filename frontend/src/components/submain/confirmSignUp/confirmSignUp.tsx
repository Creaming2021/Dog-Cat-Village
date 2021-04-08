import React, { useEffect, useState } from "react";
import ErrorAlert from "../../error/errorAlert";

type ConfirmSignUpProps = {
  match: any;
};

const ConfirmSignUp = ({ match }: ConfirmSignUpProps) => {
  const [state, setState] = useState<String>('');

  useEffect(() => {
    console.log(match.params.result);
    if(match.params.result === 'success' || match.params.result === 'fail') {
        setState(match.params.result);
    } else { 
      setState('invalid');
    }
  }, []);
  
  return (
    <>
      {state === "success" && (
        <ErrorAlert message="이메일 인증에 성공했습니다." />
      )}
      {state === "fail" && (
        <ErrorAlert message="이메일 인증에 실패했습니다." />
      )}
      {state === "invalid" && (
        <ErrorAlert message="잘못된 요청 입니다." />
      )}
    </>
  );
};

export default ConfirmSignUp;
