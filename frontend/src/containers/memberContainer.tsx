import React, { useEffect, useState } from "react";
import rootReducer from "../modules/index";
import { useSelector, useDispatch } from "react-redux";
import * as UserAction from "../modules/member";
import { SignInInputType, SignUpInputType } from "../interface/consumer";
import Nav from "../components/nav/nav";
import Main from "../components/submain/main/main";
import FindPassword from "../components/submain/findPassword/findPassword";
import SignIn from "../components/submain/signIn/signIn";
import SignUp from "../components/submain/signUp/signUp";
import { useHistory } from "react-router-dom";
import { handleAuthResponse, handleError, handleResponse } from "../service/client";
import { AxiosError } from "axios";

const MemberContainer = () => {
  const history = useHistory();
  type ViewType = "main" | "logIn" | "join" | "findPassword";

  const [view, setView] = useState<ViewType>("main");
  const [type, setType] = useState<string>("");

  const goToMain = (): void => {
    setView("main");
    setType("");
  };

  const goToLogIn = (type: string): void => {
    setView("logIn");
    setType(type);
  };

  const goToJoin = (type: string): void => {
    setView("join");
    setType(type);
  };

  const goToFindPassword = (type: string): void => {
    setView("findPassword");
    setType(type);
  };

  // store에 있는 state와 dispatch 가져오는 작업
  const member = useSelector((state: any) => state.member);
  const dispatch = useDispatch();

  useEffect(() => {
    if (member.logIn) {
      if(member.role === "ADMIN") history.push(`/admin`);
      else if(member.role === "CONSUMER") history.push(`/user`);
      else if(member.role === "SHELTER") history.push(`/main`);
    }
  }, [member]);

  useEffect(() => {
    setSignUpInput({...signUpInput, role: type});
  }, [type]);

  // 로그인
  const initialSignInInput: SignInInputType = {
    username: "",
    password: "",
  };

  const initialSignUpInputType: SignUpInputType = {
    emailId: "",
    emailSite: "",
    name: "",
    password: "",
    passwordConfirm: "",
    phoneNumber1: "",
    phoneNumber2: "",
    phoneNumber3: "",
    role: '',
  };

  const initialFindPasswordInput: string = "";

  const [signInInput, setSignInInput] = useState<SignInInputType>(
    initialSignInInput
  );
  const [signUpInput, setSignUpInput] = useState<SignUpInputType>(
    initialSignUpInputType
  );
  const [email, setEmail] = useState<string>(initialFindPasswordInput);

  useEffect(() => {
    setSignInInput(initialSignInInput);
    setSignUpInput(initialSignUpInputType);
    setEmail(initialFindPasswordInput);
  }, [view]);

  // 로그인 정보 데이터 수정
  const onChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignInInput({
      ...signInInput,
      [name]: value,
    });
  };

  // 회원가입 정보 데이터 수정
  const onChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpInput({
      ...signUpInput,
      [name]: value,
      role: type,
    });
  };

  // 이메일 정보 데이터 수정
  const onChangeFindPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  /* api 요청을 보낼 함수 */
  // 로그인 요청
  const signIn = () => {
    dispatch(UserAction.signIn(signInInput))
    .then(handleAuthResponse)
    .catch((e: AxiosError) => handleError(e));
  };

  // 회원가입 요청
  const signUp = () => {
    dispatch(UserAction.signUp(signUpInput))
    .then(handleResponse)
    .catch((e: AxiosError) => handleError(e));
  };

  // 비밀번호찾기 요청
  const findPW = () => {
    dispatch(UserAction.findPW(email))
    .then(handleResponse)
    .catch((e: AxiosError) => handleError(e));
  };

  //닉네임 중복 확인 요청
  const checkName = ():boolean => {
    dispatch(UserAction.checkName(signUpInput.name))
    .then(handleResponse)
    .catch((e: AxiosError) => { 
      handleError(e); 
      return false; 
    });
    return true;
  };

  return (
    <>
      <Nav role="MEMBER" />
      {view === "main" && <Main goToLogIn={goToLogIn} />}
      {view === "logIn" && (
        <SignIn
          type={type}
          goToMain={goToMain}
          goToJoin={goToJoin}
          goToFindPassword={goToFindPassword}
          signInInput={signInInput}
          onChangeSignIn={onChangeSignIn}
          signIn={signIn}
        />
      )}
      {view === "join" && (
        <SignUp
          type={type}
          goToLogIn={goToLogIn}
          signUpInput={signUpInput}
          onChangeSignUp={onChangeSignUp}
          signUp={signUp}
          checkName={checkName}
        />
      )}
      {view === "findPassword" && (
        <FindPassword
          type={type}
          goToJoin={goToJoin}
          goToLogIn={goToLogIn}
          email={email}
          onChangeFindPassword={onChangeFindPassword}
          findPW={findPW}
        />
      )}
    </>
  );
};

export default MemberContainer;
