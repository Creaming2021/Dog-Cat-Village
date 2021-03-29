import { createAction, handleActions } from "redux-actions";
import * as AdoptAPI from "../service/adopt";
import { applyPenders } from "redux-pender";

// adopt 관련 요청 액션 타입
const GET_SHELTER_ANIMAL_LIST = "shelter/GET_SHELTER_ANIMAL_LIST";
const GET_SHELTER_ADOPT_LIST = "shelter/GET_SHELTER_ADOPT_LIST";
const GET_SHELTER_ADOPT_DETAIL = "shelter/GET_SHELTER_ADOPT_DETAIL";
const CHANGE_ADOPT_STATUS = "shelter/CHANGE_ADOPT_STATUS";
const REGISTER_ADOPT = "consumer/REGISTER_ADOPT";
const GET_CONSUMER_ADOPT_LIST = "consumer/GET_CONSUMER_ADOPT_LIST";
const GET_CONSUMER_ADOPT_DETAIL = "consumer/GET_CONSUMER_ADOPT_DETAIL";

// 액션 객체 생성함수
export const getShelterAniamlList = createAction(
  GET_SHELTER_ANIMAL_LIST,
  AdoptAPI.getShelterAniamlList
);

export const getShleterAdoptList = createAction(
  GET_SHELTER_ADOPT_LIST,
  AdoptAPI.getShleterAdoptList
);

export const getShelterAdoptDetail = createAction(
  GET_SHELTER_ADOPT_DETAIL,
  AdoptAPI.getShelterAdoptDetail
);

export const changeAdoptStatus = createAction(
  CHANGE_ADOPT_STATUS,
  AdoptAPI.changeAdoptStatus
);

export const registerAdopt = createAction(
  REGISTER_ADOPT,
  AdoptAPI.registerAdopt
);

export const getConsumerAdoptList = createAction(
  GET_CONSUMER_ADOPT_LIST,
  AdoptAPI.getConsumerAdoptList
);

export const getConsumerAdoptDetail = createAction(
  GET_CONSUMER_ADOPT_DETAIL,
  AdoptAPI.getConsumerAdoptDetail
);

// 초기상태
const initialState = {
  animalList: [],
  adoptList: [],
  selectedAdopt: {
    id,
    petId,
    petName,
    consumer: {
      id,
      profileImage,
      name,
      email,
      phoneNumber,
    },
    name,
    sex,
    age,
    address,
    description,
    day,
    time,
    acceptStatus,
    createdDate,
  },
};

// reducer 함수
const adoptReducer = handleActions({}, initialState);

// reducer 함수로 요청된 액션들을 처리하기 위한 함수
export default applyPenders(adoptReducer, [
  {
    type: GET_SHELTER_ANIMAL_LIST,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("동물 리스트 응답", response);

      return ({
        ...state,
        shelterAnimalList: {
          ...response.data,
        }
      });
    },
    onFailure: (state, action) => {
      return { ...state };
    },
  },
  {
    type: GET_SHELTER_ADOPT_LIST,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("입양 리스트 응답", response);

      return ({
        ...state,
        adoptList: {
          ...response.data,
        }
      });
    },
    onFailure: (state, action) => {
      return { ...state };
    },
  },
  {
    type: GET_SHELTER_ADOPT_DETAIL,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("입양 자세한 정보 응답", response);

      return ({
        ...state,
        selectedAdopt: {
          ...response.data,
        }
      });
    },
    onFailure: (state, action) => {
      return { ...state };
    },
  },
  {
    type: CHANGE_ADOPT_STATUS,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("입양 상태 변경 응답", response);

      return ({
        ...state,
        selectedAdopt: {
          ...response.data,
        }
      });
    },
    onFailure: (state, action) => {
      return { ...state };
    },
  },
  {
    type: REGISTER_ADOPT,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("입양 신청 응답", response);

      return ({
        ...state,
        selectedAdopt: {
          ...response.data,
        }
      });
    },
    onFailure: (state, action) => {
      return { ...state };
    },
  },
  {
    type: GET_CONSUMER_ADOPT_LIST,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("입양 리스트 응답", response);

      return ({
        ...state,
        adoptList: {
          ...response.data,
        }
      });
    },
    onFailure: (state, action) => {
      return { ...state };
    },
  },
  {
    type: GET_CONSUMER_ADOPT_DETAIL,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("입양 자세한 정보 응답", response);

      return ({
        ...state,
        selectedAdopt: {
          ...response.data,
        }
      });
    },
    onFailure: (state, action) => {
      return { ...state };
    },
  },
]);
