import { AxiosError, AxiosResponse } from "axios"; 
import { ActionType, createAction, createAsyncAction, createReducer } from "typesafe-actions"; 
import { asyncState, createAsyncReducer, transformToArray } from "../lib/reducerUtils";
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from "../lib/createAsyncSaga";
import * as MemberAPI from '../service/member';
import { SignInResponseType, SignInInputType, SignUpInputType, SetPasswordRequestType } from "../interface/member";
import { ModifyShelterInfoType, ShelterInfoType } from "../interface/shelter";
import * as ShelterAPI from "../service/shelter";
import { ProfileInfoType } from "../interface/consumer";

// 로그인 요청 액션 타입
const SIGN_IN = 'member/SIGN_IN';
const SIGN_IN_SUCCESS = 'member/SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'member/SIGN_IN_ERROR';

// 로그아웃 요청 액션 타입
const SIGN_OUT = 'member/SIGN_OUT';

// 회원 가입 요청 액션 타입
const SIGN_UP = 'member/SIGN_UP';
const SIGN_UP_SUCCESS = 'member/SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'member/SIGN_UP_ERROR';

// 비밀번호 찾기 요청 액션 타입
const FIND_PW = 'member/FIND_PW';
const FIND_PW_SUCCESS = 'member/FIND_PW_SUCCESS';
const FIND_PW_ERROR = 'member/FIND_PW_ERROR';

// 닉네임 중복확인 요청 액션 타입
const CHECK_NAME = 'member/CHECK_NAME';
const CHECK_NAME_SUCCESS = 'member/CHECK_NAME_SUCCESS';
const CHECK_NAME_ERROR = 'member/CHECK_NAME_ERROR';

// 비밀번호 설정 액션 타입
const SET_PW = 'member/SET_PW';
const SET_PW_SUCCESS = 'member/SET_PW_SUCCESS';
const SET_PW_ERROR = 'member/SET_PW_ERROR';

// 회원 탈퇴 요청 액션 타입
const DELETE_ACCOUNT = 'member/DELETE_ACCOUNT';
const DELETE_ACCOUNT_SUCCESS = 'member/DELETE_ACCOUNT_SUCCESS';
const DELETE_ACCOUNT_ERROR = 'member/DELETE_ACCOUNT_ERROR';

// 보호소 메인 정보 조회
const GET_SHELTER_INFO = 'shelter/GET_SHELTER_INFO';
const GET_SHELTER_INFO_SUCCESS = 'shelter/GET_SHELTER_INFO_SUCCESS';
const GET_SHELTER_INFO_ERROR = 'shelter/GET_SHELTER_INFO_ERROR';

// 보호소 메인 정보 수정
const MODIFY_SHELTER_INFO = 'shelter/MODIFY_SELTER_INFO';
const MODIFY_SHELTER_INFO_SUCCESS = 'shelter/MODIFY_SELTER_INFO_SUCCESS';
const MODIFY_SHELTER_INFO_ERROR = 'shelter/MODIFY_SELTER_INFO_ERROR';

// const GET_ACCOUNT = 'member/GET_ACCOUNT';
// const MODIFY_ACCOUNT = 'member/MODIFY_ACCOUNT';

// 로그인 요청 액션 객체 생성함수
export const signInAsync = createAsyncAction( 
  SIGN_IN, 
  SIGN_IN_SUCCESS, 
  SIGN_IN_ERROR 
)<SignInInputType, AxiosResponse<SignInResponseType>, AxiosError>();

// 로그아웃 요청 액션 객체 생성함수
export const signOut = () => ({ type: SIGN_OUT });

// 회원 가입 요청 액션 객체 생성함수
export const signUpAsync = createAsyncAction(
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
)<SignUpInputType, AxiosResponse<undefined>, AxiosError>();

// 비밀번호 찾기 요청 액션 객체 생성함수
export const findPWAsync = createAsyncAction(
  FIND_PW,
  FIND_PW_SUCCESS,
  FIND_PW_ERROR
)<string, AxiosResponse<undefined>, AxiosError>();

// 닉네임 중복확인 요청 액션 객체 생성함수
export const checkNameAsync = createAsyncAction(
  CHECK_NAME,
  CHECK_NAME_SUCCESS,
  CHECK_NAME_ERROR
)<string, AxiosResponse<undefined>, AxiosError>();

// 비밀번호 설정 액션 객체 생성함수
export const setPWAsync = createAsyncAction(
  SET_PW,
  SET_PW_SUCCESS,
  SET_PW_ERROR
)<SetPasswordRequestType, AxiosResponse<undefined>, AxiosError>();

// 회원 탈퇴 요청 액션 객체 생성함수
export const deleteAccountAsync = createAsyncAction(
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR
)<any, AxiosResponse<undefined>, AxiosError>();

// 보호소 메인 정보 조회
export const getShelterInfoAsync = createAsyncAction(
  GET_SHELTER_INFO,
  GET_SHELTER_INFO_SUCCESS,
  GET_SHELTER_INFO_ERROR
)<number, AxiosResponse<ShelterInfoType>, AxiosError>();

// 보호소 메인 정보 수정
export const modifyShelterInfoAsync = createAsyncAction(
  MODIFY_SHELTER_INFO,
  MODIFY_SHELTER_INFO_SUCCESS,
  MODIFY_SHELTER_INFO_ERROR
)<ModifyShelterInfoType, AxiosResponse<ShelterInfoType>, AxiosError>();

// saga
const signInSaga = createAsyncSaga(signInAsync, MemberAPI.signIn);
const signUpSaga = createAsyncSaga(signUpAsync, MemberAPI.signUp);
const findPWSaga = createAsyncSaga(findPWAsync, MemberAPI.findPW);
const checkNameSaga = createAsyncSaga(checkNameAsync, MemberAPI.checkName);
const setPWSaga = createAsyncSaga(setPWAsync, MemberAPI.setPW);
const deleteAccountSaga = createAsyncSaga(deleteAccountAsync, MemberAPI.deleteAccount);
const getShelterInfoSaga = createAsyncSaga(getShelterInfoAsync, ShelterAPI.getShelterInfo);
const modifyShelterInfoSaga = createAsyncSaga(modifyShelterInfoAsync, ShelterAPI.modifyShelterInfo);

// 멤버 saga 생성
export function* memberSaga() {
  yield takeEvery(SIGN_IN, signInSaga);
  yield takeEvery(SIGN_UP, signUpSaga);
  yield takeEvery(FIND_PW, findPWSaga);
  yield takeEvery(CHECK_NAME, checkNameSaga);
  yield takeEvery(SET_PW, setPWSaga);
  yield takeEvery(DELETE_ACCOUNT, deleteAccountSaga);
  yield takeEvery(GET_SHELTER_INFO, getShelterInfoSaga);
  yield takeEvery(MODIFY_SHELTER_INFO, modifyShelterInfoSaga);
}

// 멤버 actions 객체 모음
const actions = { 
  signInAsync,
  signUpAsync,
  findPWAsync,
  checkNameAsync,
  setPWAsync,
  deleteAccountAsync,
  getShelterInfoAsync,
  modifyShelterInfoAsync,
};

// 멤버 actions type 저장
type MemberAction = ActionType<typeof actions> 

// 멤버 state 선언
type MemberState = {
  memberInfo: {
    loading: boolean; 
    data: SignInResponseType | null; 
    error: Error | null; 
  },
  checkName: {
    loading: boolean; 
    data: boolean | null; 
    error: Error | null; 
  },
  shelterInfo: {
    loading: boolean;
    data: ShelterInfoType | null;
    error: Error | null;
  },
  profileInfo: {
    loading: boolean;
    data: ProfileInfoType | null;
    error: Error | null;
  }
};

// 멤버 state 초기 상태
const initialState: MemberState = {
  memberInfo: asyncState.initial(),
  checkName: asyncState.initial(),
  shelterInfo: asyncState.initial(),
  profileInfo: asyncState.initial(),
};

// 로그인 요청 리듀서
const signInReducer = createReducer<MemberState, MemberAction>(initialState, {
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
});

// 로그아웃 요청 리듀서
const signOutReducer = createReducer(initialState, {
  [SIGN_OUT]: () => ({
    ...initialState,
  })
});

// 회원 가입 요청 리듀서
const signUpReducer = createReducer<MemberState, MemberAction>(initialState)
.handleAction(
  transformToArray(signUpAsync),
  createAsyncReducer(signUpAsync, "memberInfo")
);


// 비밀번호 찾기 요청 리듀서
const findPWReducer = createReducer<MemberState, MemberAction>(initialState)
.handleAction(
  transformToArray(findPWAsync),
  createAsyncReducer(findPWAsync, "memberInfo")
);

// 닉네임 중복확인 요청 리듀서
const checkNameReducer = createReducer<MemberState, MemberAction>(initialState, {
  [CHECK_NAME]: state => ({
    ...state,
    checkName: asyncState.load()
  }),
  [CHECK_NAME_SUCCESS]: (state, action) => ({
    ...state,
    checkName: {
      loading: false,
      error: null,
      data: true
    }
  }),
  [CHECK_NAME_ERROR]: (state, action) => ({
    ...state,
    checkName: asyncState.error(action.payload)
  })
});

// 비밀번호 설정 리듀서
const setPWReducer = createReducer<MemberState, MemberAction>(initialState)
.handleAction(
  transformToArray(setPWAsync),
  createAsyncReducer(setPWAsync, "memberInfo")
);

// 회원 탈퇴 요청 리듀서
const deleteAccountReducer = createReducer<MemberState, MemberAction>(initialState)
.handleAction(
  transformToArray(deleteAccountAsync),
  createAsyncReducer(deleteAccountAsync, "memberInfo")
);

// 보호소 메인 정보 조회 리듀서
const getShelterInfoReducer = createReducer<MemberState, MemberAction>(initialState)
.handleAction(
  transformToArray(getShelterInfoAsync),
  createAsyncReducer(getShelterInfoAsync, "shelterInfo")
)

// 보호소 메인 정보 수정 리듀서
const modifyShelterInfoReducer = createReducer<MemberState, MemberAction>(initialState)
.handleAction(
  transformToArray(modifyShelterInfoAsync),
  createAsyncReducer(modifyShelterInfoAsync, "shelterInfo")
)

const member = createReducer<MemberState, MemberAction>(initialState, {
  ...signInReducer.handlers,
  ...signOutReducer.handlers,
  ...signUpReducer.handlers,
  ...findPWReducer.handlers,
  ...checkNameReducer.handlers,
  ...setPWReducer.handlers,
  ...deleteAccountReducer.handlers,
  ...getShelterInfoReducer.handlers,
  ...modifyShelterInfoReducer.handlers
});

export default member;

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
