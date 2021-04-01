/*
    서버한테 데이터 요청 보낼 기본 url 세팅 파일
    다른 파일에서는 axios 대신 client.js 를 임포트 하여 요청 파트 작성하면 됨
*/
import axios, { AxiosError, AxiosResponse } from "axios";
import qs from 'qs';

// axios.defaults.baseURL = 'http://j4b106.p.ssafy.io/api/';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.responseType = 'json';
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

// 로그인 이외의 모든 요청 성공 시
export const handleResponse = (response: any) => {
  console.log("로그인 요청 이외의 성공 핸들러");
  console.log(response && response.data);
  console.log(response && response.status);
  console.log(response && response.statusText);
  console.log(response && response.headers);
  console.log(response && response.config);
  return response;
};

// 로그인 요청 성공 시
export const handleAuthResponse = (response: any) => {
  console.log("로그인 요청 성공 핸들러");
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);

  // 토큰 저장
  localStorage.setItem('access_token', response.data.access_token);
  localStorage.setItem('refresh_token', response.data.refresh_token);

  return response;
};

// 로그인, 회원가입, 비밀번호 찾기, 비밀번호 설정 에러 처리
export const handleError = (e: any) => {
  console.log("일반 에러 핸들러");
  if (e.response) {
    alert(e.response.data.errorMessage);
    console.log("응답은 있는데 오류", e.response.status);
    console.log(e.response.headers);
  } else if(e.request){
    alert("응답 없음" + e.request);
  } else {
    alert("요청 이상" + e.message);
  }
  console.log(e.response.data.errorMessage);
  return e;
};

// 위의 요청 이외의 에러 처리
export const handleSecurityError = (e: any) => {
  console.log("보안 에러 핸들러");
  if (e.response) {
    console.log(e.response);
    alert(e.response.data.error_description);
    console.log("응답은 있는데 오류", e.response.status);
    console.log(e.response.headers);
  } else if(e.request){
    alert("응답 없음" + e.request);
  } else {
    alert("요청 이상" + e.message);
  }
  console.log(e.config);
  return e;
};

// 회원가입, 비밀번호 찾기, 비밀번호 설정, 닉네임 중복확인
export const basic = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

// 로그인 ( auth만 )
export const auth = axios.create({
  headers: {
    'Content-Type' : 'application/json',
    'Authorization': 'Basic ' + new Buffer('ssafy:ssafy').toString('base64'),
  },
});

// 사용 시 필수 데이터
// auth.post<SignInResponseType>(
//   `url`, 
//   qs.stringify(
//     { username, password, grant_type: "password" }
//  ));

// 회원가입, 비번찾기, 비번설정, 로그인 제외 하고 다 (auth, token 둘 다)
export const security = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// 사용 시 필수 데이터
// security.get<응답 객체 인터페이스>('url', {
//   'headers': {
//     'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//   }
// });

// access-token 만료 시 refresh token으로 다시 access-token 불러 오기
export const refresh = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + new Buffer('ssafy:ssafy').toString('base64'),
  }
});

// 사용 시 필수 데이터
// refresh.post<응답 객체 인터페이스>('url', 
//   qs.stringify(
//     { 
//       grant_type: "refresh_token", 
//       refresh_token: localStorage.getItem('refresh_token') 
//     })  
// );