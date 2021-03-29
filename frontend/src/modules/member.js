import { createAction, handleActions } from 'redux-actions';
import * as MemberAPI from '../service/member';
import { applyPenders } from 'redux-pender';

// user 관련 요청 액션 타입
const LOG_IN = 'member/LOG_IN';
const LOG_OUT = 'member/LOG_OUT';
const GET_ACCOUNT = 'member/GET_ACCOUNT';
const SIGN_UP = 'member/SIGN_UP';
const MODIFY_ACCOUNT = 'member/MODIFY_ACCOUNT';
const DELETE_ACCOUNT = 'member/DELETE_ACCOUNT';
const FIND_PW = 'member/FIND_PW';
const CHECK_NAME = 'member/CHECK_NAME';

// 액션 객체 생성함수
export const signIn = createAction(
  LOG_IN, 
  MemberAPI.signIn
);

export const logOut = createAction(
  LOG_OUT
);

export const getAccount = createAction(
  GET_ACCOUNT
);

export const signUp = createAction(
  SIGN_UP,
  MemberAPI.signUp
);

export const modifyAccount = createAction(
  MODIFY_ACCOUNT, 
  MemberAPI.modifyAccount
);

export const findPW = createAction(
  FIND_PW,
  MemberAPI.findPW
);

export const deleteAccount = createAction(
  DELETE_ACCOUNT, 
  MemberAPI.deleteAccount
);

export const checkName = createAction(
  CHECK_NAME,
  MemberAPI.checkName
)

// 초기 상태
const initialState = {
  logIn: false,
  profileImage: '',
  name: '',
  email: '',
  introduction: '',
};

// reducer 함수
const memberReducer = handleActions(
  {
    [LOG_OUT]: (state, action) => {
      localStorage.removeItem('token');
      return { ...initialState };
    },
    [GET_ACCOUNT]: (state, action) => {
      return { ...action.payload };
    },
  },
  initialState
);

// reducer 함수로 요청된 액션들을 처리하기 위한 함수
export default applyPenders(memberReducer, [
  {
    type: LOG_IN,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("로그인 응답", action.payload);

      return { ...action.payload, login: true, };
    },
    onFailure: (state, action) => {
      return {...initialState};
    },
  },
  {
    type: SIGN_UP,
    onSuccess: (state, action) => {
      alert('인증 메일을 발송하였습니다.');
      return {...state};
    },
    onFailure: (state, action) => {
      return {...initialState};
    },
  },
  {
    type: MODIFY_ACCOUNT,
    onSuccess: (state, action) => {
      const response = action.payload;

      // localStorage.setItem('token', response.data.data.token);
      // client.defaults.headers.common['token'] = localStorage.getItem(
      //   'token'
      // );

      console.log("정보 수정", action.payload);

      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...response.data.data.userInfo,
        },
      };
    },
    onFailure: (state, action) => {
      return state;
    },
  },
  {
    type: DELETE_ACCOUNT,
    onSuccess: (state, action) => {
      localStorage.removeItem('token');
      return {
        ...initialState,
      };
    },
    onFailure: (state, action) => {
      return state;
    },
  },
  {
    type: FIND_PW,
    onSuccess: (state, action) => {
      const response = action.payload;
      
      alert('임시 비밀번호가 발급되었습니다.');
      return state;
    },
    onFailure: (state, action) => {
      return state;
    },
  },
  {
    type: CHECK_NAME,
    onSuccess: (state, action) => {
      const response = action.payload;
      
      alert("사용 가능한 닉네임 입니다.");
      return state;
    },
    onFailure: (state, action) => {
      return { ...initialState};
    },
  },
]);
