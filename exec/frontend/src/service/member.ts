/*
    서버한테 유저 관련 요청 보낼 함수 세팅 파일
*/

import { SignInInputType, SignInResponseType, SignUpInputType, SetPasswordRequestType } from '../interface/member';
import { security, basic, auth } from './instance';

// 로그인 정보 확인
export const signIn = async ({ username, password, memberRole }: SignInInputType) => {
  const response = await auth.post<SignInResponseType>(
    `members/login`, 
    {
      username, password, memberRole, grant_type: "password",
    }
  );
  return response.data;
};

// 회원 가입 하기
export const signUp = async ({ emailId, emailSite, name, password, 
          phoneNumber1, phoneNumber2, phoneNumber3, memberRole }: SignUpInputType) => {
  const response = await basic.post<undefined>(
    `members/signup`, 
    { email: `${emailId}@${emailSite}`, 
      phoneNumber: `${phoneNumber1}${phoneNumber2}${phoneNumber3}`,
      name, 
      password,
      memberRole 
    });
  return response.data;
};

// 비밀번호 찾기
export const findPW = async (email: string) => {
  const response = await basic.post<undefined>(`members/forget`, { email });
  return response.data;
};

// 닉네임 중복확인
export const checkName = async ( name: string ) => {
  const response = await basic.post<undefined>(`members/duplication`, { name });
  return response.data;
};

// 비밀번호 설정
export const setPW = async ({ password, token }: SetPasswordRequestType ) => {
  const response = await basic.post<undefined>(`members/password/${token}`, { password });
  return response.data;
};

// 회원 탈퇴 하기
export const deleteAccount = async () => {
  const response = await security.delete<undefined>(`members`, {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
  });
  return response.data;
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
