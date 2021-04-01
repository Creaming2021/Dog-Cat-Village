/*
    서버한테 유저 관련 요청 보낼 함수 세팅 파일
    각 요청함수 별로 요청이 성공이 되었을 경우
      => 
    실패로 왔을 경우를 client에서 한번에 처리 작성
*/

import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { SignInInputType, SignInResponseType } from '../interface/member';
import { security, basic, auth, 
    handleAuthResponse, handleResponse, handleError, handleSecurityError } from './instance';

// 로그인 정보 확인
export const signIn = async ({ username, password }: SignInInputType) => {
  return await auth.post<SignInResponseType>(
    `oauth/token`, 
    qs.stringify({ username, password, grant_type: "password" })
  )
};


// // 회원 가입 하기
// export const signUp = ({ emailId, emailSite, name, password, 
//           phoneNumber1, phoneNumber2, phoneNumber3, role }) => {
//   return basic.post(`consumers/signup`, 
//                     { email: `${emailId}@${emailSite}`, 
//                       phone: `${phoneNumber1}${phoneNumber2}${phoneNumber3}`,
//                       name, 
//                       password,
//                       //role 
//                     });
// };

// // 회원 정보 조회
// export const getAccount = (email) => {
//   return security.get(`consumers/${email}`)
//                 // .then(handleResponse())
//                 // .catch(handleSecurityError());
// };

// // 회원 정보 수정
// export const modifyAccount = ({ email, name, imageUrl, 
//           prevPassword, newPassword, introduction }) => {
//   const formData = new FormData();
//   formData.append('email', email);
//   formData.append('name', name);
//   formData.append('prevPassword', prevPassword);
//   formData.append('newPassword', newPassword);
//   formData.append('introduction', introduction);

//   if(imageUrl === null) {
//     formData.append('change', 'delete');
//   }
//   else if(typeof imageUrl === 'object'){
//     formData.append('imageUrl', imageUrl);
//   }

//   return security.put('consumers',{ formData })
//                 // .then(handleResponse())
//                 // .catch(handleSecurityError());
// };

// // 회원 탈퇴 하기
// export const deleteAccount = (email) => {
//   return security.delete(`consumers/${email}`)
//                 // .then(handleResponse())
//                 // .catch(handleSecurityError());;
// };

// // 비밀번호 찾기
// export const findPW = (email) => {
//   return basic.post(`consumers/do/${email}`);
// };

// // 닉네임 중복확인
// export const checkName = (name) => {
//   return security.post(`consumers/check`, { name });
// };

// // 비밀번호 설정
// export const setPW = (password) => {
//   return basic.post(`consumers/do`);
// };