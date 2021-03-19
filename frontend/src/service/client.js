/*
    서버한테 데이터 요청 보낼 기본 url 세팅 파일
    다른 파일에서는 axios 대신 client.js 를 임포트 하여 요청 파트 작성하면 됨
*/

import axios from 'axios';

const client = axios.create();

export const handleResponse = (response) => {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
};

export const handleError = (e) => {
    if (e.response) {
        alert(e.response.data.message);
        // console.log(e.response.status);
        // console.log(e.response.headers);
      } else {
        alert(e.message);
        // console.log(e.message);
      }
}

client.defaults.baseURL = 'http://j4b106.p.ssafy.io/api/';
// client.defaults.baseURL = '192.168.1.3:8080/api/';

// client.defaults.headers.common['token'] = localStorage.getItem('token');
// client.defaults.headers.common['Content-Type'] = `application/json`;

export default client;
