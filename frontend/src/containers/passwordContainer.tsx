import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorAlert from "../components/error/errorAlert";
import SetPassword from '../components/submain/setPassword/setPassword';
import * as MemberAction from "../modules/member";

type PasswordContainerProps = {
  match: any;
};

const PasswordContainer = ({ match }: PasswordContainerProps) => {
  const [state, setState] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    if(match.params.result === 'expire') {
        setState(false);
    } else { 
      setState(true);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  }

  const onSubmitSetPassword = (): void => {
    // dispatch(MemberAction.setPW(password));
  }

  return (
    <>
      {state
      ? <SetPassword 
          password={password} 
          onChangePassword={onChange}
          setPassword={onSubmitSetPassword}/>
      : <ErrorAlert message="비밀번호 변경 기간이 만료 되었습니다."/>}
    </>
  );
};

export default PasswordContainer;
