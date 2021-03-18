/*
    서버한테 유저 관련 요청 보낼 함수 세팅 파일
    각 요청함수 별로 요청이 성공이 되었을 경우
      => 
    실패로 왔을 경우를 client에서 한번에 처리 작성
*/

import client, { handleResponse, handleError } from './client';

// 로그인 정보 확인
export const signIn = ({ email, password }) => {
  return client.post(`users/login`, 
                    { email, password })
  // .then(handleResponse)
  // .catch(handleError);
};

// 회원 가입 하기
export const signUp = ({ emailId, emailSite, nickname, password, 
          phoneNumber1, phoneNumber2, phoneNumber3 }) => {
  return client.post(`users/signup`, 
                    { email: `${emailId}@${emailSite}`, 
                      phone: `${phoneNumber1}${phoneNumber2}${phoneNumber3}`,
                      nickname, 
                      password })
  // .then(handleResponse)
  // .catch(handleError);
};

// 회원 정보 조회
export const getAccount = (email) => {
  return client.get(`users/${email}`)
  // .then(handleResponse)
  // .catch(handleError);
};

// 회원 정보 수정
export const modifyAccount = ({ email, nickname, imageUrl, 
          prevPassword, newPassword, introduction }) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('nickname', nickname);
  formData.append('prevPassword', prevPassword);
  formData.append('newPassword', newPassword);
  formData.append('introduction', introduction);

  if(imageUrl === null) {
    formData.append('change', 'delete');
  }
  else if(typeof imageUrl === 'object'){
    formData.append('imageUrl', imageUrl);
  }

  return client({
    url: `users`,
    method: 'put',
    data: formData,
  })
  // .then(handleResponse)
  // .catch(handleError);
};

// 회원 탈퇴 하기
export const deleteAccount = (email) => {
  return client.delete(`users/${email}`)
  // .then(handleResponse)
  // .catch(handleError);
};

// 비밀번호 찾기
export const findPW = (email) => {
  return client.post(`users/do/${email}`)
  // .then(handleResponse)
  // .catch(handleError);
};

// 닉네임 중복확인
export const checkNickname = (nickname) => {
  return client.post(`users/check`, { nickname })
  // .then(handleResponse)
  // .catch(handleError);
};