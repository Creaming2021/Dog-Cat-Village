import { createAction, handleActions } from "redux-actions";
import * as PetAPI from "../service/pet";
import { applyPenders } from "redux-pender";
import { updateObject } from "../service/common";

// pet 관련 요청 액션 타입
const GET_PET_LIST = 'pet/GET_PET_LIST';
const REGISTER_PET = 'pet/REGISTER_PET';
const GET_PET = 'pet/GET_PET';
const MODIFY_PET = 'pet/MODIFY_PET';
const DELETE_PET = 'pet/DELETE_PET';
const SET_INITIAL_SELECTED_PET = 'pet/SET_INITIAL_SELECTED_PET';

// 액션 객체 생성함수
export const getPetList = createAction(
  GET_PET_LIST, 
  PetAPI.getPetList
);

export const registerPet = createAction(
  REGISTER_PET, 
  PetAPI.registerPet
);

export const getPet = createAction(
  GET_PET, 
  PetAPI.getPet
);

export const modifyPet = createAction(
  MODIFY_PET, 
  PetAPI.modifyPet
);

export const deletePet = createAction(
  DELETE_PET, 
  PetAPI.deletePet
);

// 초기 상태
const initailState = {
  petList: [],
  selectedPet: {
    id: '',
    name: '',
    profileImage: '',
    sex: '',
    breedType: '',
    weight: '',
    breed: '',
    personality: '',
    neuter: '',
    condition: '',
    shelterId: '',
    birthday: '',
    age: '',
  }
}

// reducer 함수
const petReducer = handleActions(
  {
    [SET_INITIAL_SELECTED_PET]: (state, action) => {
      return { ...state, selectedPet: {...initailState.selectedPet}};
    }
  }, 
  initailState
)

export default applyPenders(petReducer, [
  {
    type: GET_PET_LIST,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("동물 리스트 응답 ", response);

      return {
        ...state,
        petList: { ...response.data, }
      };
    },
    onFailure: (state, action) => {
      return { ...state };
    }
  },
  {
    type: REGISTER_PET,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("동물 등록 응답 ", response);

      return {
        ...state,
      };
    },
    onFailure: (state, action) => {
      return { ...state };
    }
  },
  {
    type: GET_PET,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("동물 디테일 정보 응답 ", response);

      return {
        ...state,
        selectedPet: { ...response.data, }
      };
    },
    onFailure: (state, action) => {
      return { ...state };
    }
  },
  {
    type: MODIFY_PET,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("동물 정보 수정 응답 ", response);

      return {
        ...state,
        petList: { ...response.data, }
      };
    },
    onFailure: (state, action) => {
      return { ...state };
    }
  },
  {
    type: DELETE_PET,
    onSuccess: (state, action) => {
      const response = action.payload;

      console.log("동물 정보 삭제 응답 ", response);

      return {
        ...state,
        selectedPet: { ...initailState.selectedAnimal, }
      };
    },
    onFailure: (state, action) => {
      return { ...state };
    }
  },
]);