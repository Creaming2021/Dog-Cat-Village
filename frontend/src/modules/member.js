import { createAction, handleActions } from 'redux-actions';
import * as MemberAPI from '../service/member';
import { applyPenders } from 'redux-pender';

// user 관련 요청 액션 타입
const SIGN_IN = 'member/SIGN_IN';
const SIGN_OUT = 'member/SIGN_OUT';
const GET_ACCOUNT = 'member/GET_ACCOUNT';
const SIGN_UP = 'member/SIGN_UP';
const MODIFY_ACCOUNT = 'member/MODIFY_ACCOUNT';
const DELETE_ACCOUNT = 'member/DELETE_ACCOUNT';
const FIND_PW = 'member/FIND_PW';
const CHECK_NAME = 'member/CHECK_NAME';
const SET_PW = 'member/SET_PW';

// 액션 객체 생성함수
export const signIn = createAction(
  SIGN_IN, 
  MemberAPI.signIn
);

export const logOut = createAction(
  SIGN_OUT
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

export const setPW = createAction(
  SET_PW,
  MemberAPI.setPW
)

// 초기 상태
const initialState = {
  logIn: false,
};

// reducer 함수
const memberReducer = handleActions(
  {
    [SIGN_OUT]: (state, action) => {
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
    type: SIGN_IN,
    onSuccess: (state, action) => {
      if(action.payload.status === 200) console.log("리듀서 성공");
      else console.log("리듀서 실패");
      return { login: true, };
    },
    onFailure: (state, action) => {
      console.log("리듀서 에러");
      return {...initialState};
    },
  },
  {
    type: SIGN_UP,
    onSuccess: (state, action) => {
      alert('인증 메일을 발송하였습니다.');
      return { ...state };
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
  {
    type: SET_PW,
    onSuccess: (state, action) => {
      const response = action.payload;
      
      alert('임시 비밀번호가 발급되었습니다.');
      return state;
    },
    onFailure: (state, action) => {
      return state;
    },
  },
]);
