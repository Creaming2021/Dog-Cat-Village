import { AxiosError, AxiosResponse } from "axios"; 
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions"; 
import { asyncState, createAsyncReducer, transformToArray } from "../lib/reducerUtils";
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from "../lib/createAsyncSaga";
import * as MemberAPI from '../service/member';
import { SignInResponseType, SignInInputType } from "../interface/member";

// 로그인 요청 액션 타입
const SIGN_IN = 'member/SIGN_IN';
const SIGN_IN_SUCCESS = 'member/SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'member/SIGN_IN_ERROR';

// const SIGN_OUT = 'member/SIGN_OUT';
// const GET_ACCOUNT = 'member/GET_ACCOUNT';
// const SIGN_UP = 'member/SIGN_UP';
// const MODIFY_ACCOUNT = 'member/MODIFY_ACCOUNT';
// const DELETE_ACCOUNT = 'member/DELETE_ACCOUNT';
// const FIND_PW = 'member/FIND_PW';
// const CHECK_NAME = 'member/CHECK_NAME';
// const SET_PW = 'member/SET_PW';

// 로그인 요청 액션 객체 생성함수
export const signInAsync = createAsyncAction( 
  SIGN_IN, 
  SIGN_IN_SUCCESS, 
  SIGN_IN_ERROR 
)<SignInInputType, AxiosResponse<SignInResponseType>, AxiosError>();

// 로그인 요청 saga
const signInSaga = createAsyncSaga(signInAsync, MemberAPI.signIn);

// 멤버 saga 생성
export function* memberSaga() {
  yield takeEvery(SIGN_IN, signInSaga);
  // 다른 요청들 여기 추가로 적으면 됨
}

// 멤버 actions 객체 모음
const actions = { 
  signInAsync 
  // 다른 요청들 여기 추가로 적으면 됨
};

// 멤버 actions type 저장
type MemberAction = ActionType<typeof actions> 

// 멤버 state 선언
export type MemberState = {
  memberInfo: {
    loading: boolean; 
    data: SignInResponseType | null; 
    error: Error | null; 
  },
};

// 멤버 state 초기 상태
const initialState: MemberState = {
  memberInfo: asyncState.initial(),
};

// 요청 저장 할 때 예외 처리 할 일 없으면 이거 바로 사용
// const member = createReducer<MemberState, MemberAction>(initialState).handleAction(
//   transformToArray(signInAsync),
//   createAsyncReducer(signInAsync, 'memberInfo')
// )

// 요청 저장 시 특정값 수정해야 할 때 각 상태 별 state값 변경시 사용
const member = createReducer<MemberState, MemberAction>(initialState, {
  [SIGN_IN]: state => ({
    ...state,
    memberInfo: asyncState.load()
  }),
  [SIGN_IN_SUCCESS]: (state, action) => ({
    ...state,
    memberInfo: {
      loading: false,
      error: null,
      data: {
        logIn: true,
        memberRole: action.payload.data.memberRole,
        memberId: action.payload.data.memberId,
      }
    }
  }),
  [SIGN_IN_ERROR]: (state, action) => ({
    ...state,
    memberInfo: asyncState.error(action.payload)
  })
})
// .handleAction( // 주석 해제 후 다른 async 함수들 적으면 됨
//   transformToArray(signInAsync),
//   createAsyncReducer(signInAsync, 'memberInfo')
// );

export default member;


// export const logOut = createAction(
//   SIGN_OUT
// );

// export const getAccount = createAction(
//   GET_ACCOUNT
// );

// export const signUp = createAction(
//   SIGN_UP,
//   MemberAPI.signUp
// );

// export const modifyAccount = createAction(
//   MODIFY_ACCOUNT, 
//   MemberAPI.modifyAccount
// );

// export const findPW = createAction(
//   FIND_PW,
//   MemberAPI.findPW
// );

// export const deleteAccount = createAction(
//   DELETE_ACCOUNT, 
//   MemberAPI.deleteAccount
// );

// export const checkName = createAction(
//   CHECK_NAME,
//   MemberAPI.checkName
// )

// export const setPW = createAction(
//   SET_PW,
//   MemberAPI.setPW
// )

// // reducer 함수
// const memberReducer = handleActions(
//   {
//     [SIGN_OUT]: (state, action) => {
//       localStorage.removeItem('token');
//       return { ...initialState };
//     },
//     [GET_ACCOUNT]: (state, action) => {
//       return { ...action.payload };
//     },
//   },
//   initialState
// );

// // reducer 함수로 요청된 액션들을 처리하기 위한 함수
// export default applyPenders(memberReducer, [
//   {
//     type: SIGN_IN,
//     onSuccess: (state, action) => {
//       if(action.payload.status === 200) console.log("리듀서 성공");
//       else console.log("리듀서 실패");
//       return { login: true, };
//     },
//     onFailure: (state, action) => {
//       console.log("리듀서 에러");
//       return {...initialState};
//     },
//   },
//   {
//     type: SIGN_UP,
//     onSuccess: (state, action) => {
//       alert('인증 메일을 발송하였습니다.');
//       return { ...state };
//     },
//     onFailure: (state, action) => {
//       return {...initialState};
//     },
//   },
//   {
//     type: MODIFY_ACCOUNT,
//     onSuccess: (state, action) => {
//       const response = action.payload;

//       // localStorage.setItem('token', response.data.data.token);
//       // client.defaults.headers.common['token'] = localStorage.getItem(
//       //   'token'
//       // );

//       console.log("정보 수정", action.payload);

//       return {
//         ...state,
//         userInfo: {
//           ...state.userInfo,
//           ...response.data.data.userInfo,
//         },
//       };
//     },
//     onFailure: (state, action) => {
//       return state;
//     },
//   },
//   {
//     type: DELETE_ACCOUNT,
//     onSuccess: (state, action) => {
//       localStorage.removeItem('token');
//       return {
//         ...initialState,
//       };
//     },
//     onFailure: (state, action) => {
//       return state;
//     },
//   },
//   {
//     type: FIND_PW,
//     onSuccess: (state, action) => {
//       const response = action.payload;
      
//       alert('임시 비밀번호가 발급되었습니다.');
//       return state;
//     },
//     onFailure: (state, action) => {
//       return state;
//     },
//   },
//   {
//     type: CHECK_NAME,
//     onSuccess: (state, action) => {
//       const response = action.payload;
      
//       alert("사용 가능한 닉네임 입니다.");
//       return state;
//     },
//     onFailure: (state, action) => {
//       return { ...initialState};
//     },
//   },
//   {
//     type: SET_PW,
//     onSuccess: (state, action) => {
//       const response = action.payload;
      
//       alert('임시 비밀번호가 발급되었습니다.');
//       return state;
//     },
//     onFailure: (state, action) => {
//       return state;
//     },
//   },
// ]);
