/*
    서버한테 유저 관련 요청 보낼 함수 세팅 파일
*/

import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { SignInInputType, SignInResponseType, SignUpInputType, SetPasswordRequestType } from '../interface/member';
import { security, basic, auth, 
    handleAuthResponse, handleResponse, handleError, handleSecurityError } from './instance';

// 로그인 정보 확인
export const signIn = async ({ username, password, memberRole }: SignInInputType) => {
  return await auth.post<SignInResponseType>(
    `members/login`, 
    {
      username, password, memberRole, grant_type: "password",
    }
    // qs.stringify({ username, password, grant_type: "password" })
  )
};

// 회원 가입 하기
export const signUp = ({ emailId, emailSite, name, password, 
          phoneNumber1, phoneNumber2, phoneNumber3, memberRole }: SignUpInputType) => {
  return basic.post(`members/signup`, 
                    { email: `${emailId}@${emailSite}`, 
                      phoneNumber: `${phoneNumber1}${phoneNumber2}${phoneNumber3}`,
                      name, 
                      password,
                      memberRole 
                    });
};

// 비밀번호 찾기
export const findPW = (email: string) => {
  return basic.post(`members/forget`, { email });
};

// 닉네임 중복확인
export const checkName = ( name: string ) => {
  return basic.post(`members/duplication`, { name });
};

// 비밀번호 설정
export const setPW = ({ password, token }: SetPasswordRequestType ) => {
  return basic.post(`members/password/${token}`, { password });
};

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