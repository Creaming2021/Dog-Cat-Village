/*
    서버한테 데이터 요청 보낼 기본 url 세팅 파일
    다른 파일에서는 axios 대신 client.js 를 임포트 하여 요청 파트 작성하면 됨
*/
import axios from "axios";

axios.defaults.baseURL = 'http://j4b106.p.ssafy.io/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.responseType = 'json';
axios.defaults.validateStatus = (status) => status === 200;

export const handleResponse = (response) => {
  console.log(response && response.data);
  console.log(response && response.status);
  console.log(response && response.statusText);
  console.log(response && response.headers);
  console.log(response && response.config);
  return response;
};

export const handleAuthResponse = (response) => {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);

  // 토큰 저장
  localStorage.setItem('access_token', response.headers['access_token']);
  localStorage.setItem('refresh_token', response.headers['refresh_token']);

  return response;
};

export const handleError = (e) => {
  if (e.response) {
    alert(e.response.data.message);
    console.log("응답은 있는데 오류", e.response.status);
    console.log(e.response.headers);
  } else if(e.request){
    alert("응답 없음", e.request);
  } else {
    alert("요청 이상", e.message);
  }
  console.log(e.config);
  return e;
};

export const handleSecurityError = (e) => {
  if (e.response) {
    alert(e.response.data.message);
    console.log("응답은 있는데 오류", e.response.status);
    console.log(e.response.headers);

    // 토큰 유효기간 다되면 리프레쉬 토큰보내기
    
    

  } else if(e.request){
    alert("응답 없음", e.request);
  } else {
    alert("요청 이상", e.message);
  }
  console.log(e.config);
  return e;
};

export const basic = axios.create();

export const auth = axios.create({
  auth: {
    username: 'ssafy',
    password: 'ssafy',
  },
});

export const security = axios.create({
  headers: {
    'token': localStorage.getItem('token'),
  },
  auth: {
    username: 'ssafy',
    password: 'ssafy',
  },
});
