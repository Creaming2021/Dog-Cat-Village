import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Blockchain from '../../../service/blockchainAPI';
import * as BlockchainActions from "../../../modules/blockchain";
import ErrorAlert from "../../error/errorAlert";

type ConfirmSignUpProps = {
  match: any;
};

const ConfirmSignUp = ({ match }: ConfirmSignUpProps) => {
  const [state, setState] = useState<String>('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(match.params);
    if(match.params.result === 'success'){
      setState(match.params.result);
    } else if (match.params.result === 'fail') {
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
