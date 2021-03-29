import { createAction, handleActions } from 'redux-actions';
import * as UserAPI from '../service/user';
import { applyPenders } from 'redux-pender';

// user 관련 요청 액션 타입
const LOG_IN = 'user/LOG_IN';
const LOG_OUT = 'user/LOG_OUT';
const GET_ACCOUNT = 'user/GET_ACCOUNT';
const SIGN_UP = 'user/SIGN_UP';
const MODIFY_ACCOUNT = 'user/MODIFY_ACCOUNT';
const DELETE_ACCOUNT = 'user/DELETE_ACCOUNT';
const FIND_PW = 'user/FIND_PW';
const CHECK_NICKNAME = 'user/CHECK_NICKNAME';

// 액션 객체 생성함수
export const signIn = createAction(
  LOG_IN, 
  UserAPI.signIn
);

export const logOut = createAction(
  LOG_OUT
);

export const getAccount = createAction(
  GET_ACCOUNT
);

export const signUp = createAction(
  SIGN_UP,
  UserAPI.signUp
);

export const modifyAccount = createAction(
  MODIFY_ACCOUNT, 
  UserAPI.modifyAccount
);

export const findPW = createAction(
  FIND_PW,
  UserAPI.findPW
);

export const deleteAccount = createAction(
  DELETE_ACCOUNT, 
  UserAPI.deleteAccount
);

export const checkNickname = createAction(
  CHECK_NICKNAME,
  UserAPI.checkNickname
)

// 초기 상태
const initialState = {
  userInfo: {
    logIn: false,
    profileImage: '',
    nickname: '',
    email: '',
    introduction: '',
  },
};

// reducer 함수
const userReducer = handleActions(
  {
    [LOG_OUT]: (state, action) => {
      localStorage.removeItem('token');
      return { ...initialState };
    },
    [GET_ACCOUNT]: (state, action) => {
      return {
        ...initialState,
        userInfo: { ...action.payload },
      };
    },
  },
  initialState
);

// reducer 함수로 요청된 액션들을 처리하기 위한 함수
export default applyPenders(userReducer, [
  {
    type: LOG_IN,
    onSuccess: (state, action) => {
      const response = action.payload;

      return {
        ...state,
        userInfo: {
          ...response.data,
          logIn: true,
        },
      };
    },
    onFailure: (state, action) => {
      alert(action.payload.response.data.message);
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
      alert(action.payload.response.data.message);
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

      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...response.data.data.userInfo,
        },
      };
    },
    onFailure: (state, action) => {
      alert(action.payload.response.data.message);
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
      alert(action.payload.response.data.message);
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
      alert(action.payload.response.data.message);
      return state;
    },
  },
  {
    type: CHECK_NICKNAME,
    onSuccess: (state, action) => {
      const response = action.payload;
      
      alert("사용 가능한 닉네임 입니다.");
      return state;
    },
    onFailure: (state, action) => {
      alert(action.payload.response.data.message);
      return { ...initialState};
    },
  },
]);
