import { AxiosError, AxiosResponse } from "axios"; 
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions"; 
import { asyncState, createAsyncReducer, transformToArray } from "../lib/reducerUtils";
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from "../lib/createAsyncSaga";
import * as PetAPI from '../service/pet';
import { PetDetailType, PetEditType, PetListType, PetProfileImage } from "../interface/pet";

// 반려동물 전체 조회 요청 액션 타입
const GET_PET_LIST = 'pet/GET_PET_LIST';
const GET_PET_LIST_SUCCESS = 'pet/GET_PET_LIST_SUCCESS';
const GET_PET_LIST_ERROR = 'pet/GET_PET_LIST_ERROR';

// 특정 보호소 동물 리스트 조회 요청 액션 타입
const GET_SHELTER_PET_LIST = 'pet/GET_SHELTER_PET_LIST';
const GET_SHELTER_PET_LIST_SUCCESS = 'pet/GET_SHELTER_PET_LIST_SUCCESS';
const GET_SHELTER_PET_LIST_ERROR = 'pet/GET_SHELTER_PET_LIST_ERROR';

// 반려동물 등록 요청 액션 타입
const REGISTER_PET = 'pet/REGISTER_PET';
const REGISTER_PET_SUCCESS = 'pet/REGISTER_PET_SUCCESS';
const REGISTER_PET_ERROR = 'pet/REGISTER_PET_ERROR';

// 반려 동물 정보 조회 액션 타입
const GET_PET = 'pet/GET_PET';
const GET_PET_SUCCESS = 'pet/GET_PET_SUCCESS';
const GET_PET_ERROR = 'pet/GET_PET_ERROR';

// 반려 동물 정보 수정 액션 타입
const MODIFY_PET = 'pet/MODIFY_PET';
const MODIFY_PET_SUCCESS = 'pet/MODIFY_PET_SUCCESS';
const MODIFY_PET_ERROR = 'pet/MODIFY_PET_ERROR';

// 반려 동물 정보 삭제 액션 타입
const DELETE_PET = 'pet/DELETE_PET';
const DELETE_PET_SUCCESS = 'pet/DELETE_PET_SUCCESS';
const DELETE_PET_ERROR = 'pet/DELETE_PET_ERROR';

// 반려 동물 이미지 삽입 액션 타입
const SET_PROFILE_IMAGE = 'pet/SET_PROFILE_IMAGE = ';
const SET_PROFILE_IMAGE_SUCCESS = 'pet/SET_PROFILE_IMAGE_SUCCESS';
const SET_PROFILE_IMAGE_ERROR = 'pet/SET_PROFILE_IMAGE_ERROR';

// 선택된 동물 지우는 액션 타입
const SET_INITIAL_SELECTED_PET = 'pet/SET_INITIAL_SELECTED_PET';

// 반려 동물 전체 조회 액션 객체 생성함수
export const getPetListAsync = createAsyncAction(
  GET_PET_LIST,
  GET_PET_LIST_SUCCESS,
  GET_PET_LIST_ERROR
)<any, PetListType[], AxiosError>();

// 특정 보호소 동물 리스트 조회 액션 객체 생성함수
export const getShelterPetListAsync = createAsyncAction(
  GET_SHELTER_PET_LIST,
  GET_SHELTER_PET_LIST_SUCCESS,
  GET_SHELTER_PET_LIST_ERROR
)<number, PetListType[], AxiosError>();

// 반려 동물 등록 액션 객체 생성함수
export const registerPetAsync = createAsyncAction(
  REGISTER_PET,
  REGISTER_PET_SUCCESS,
  REGISTER_PET_ERROR
)<PetEditType, any, AxiosError>();

// 반려 동물 조회 액션 객체 생성함수
export const getPetAsync = createAsyncAction(
  GET_PET,
  GET_PET_SUCCESS,
  GET_PET_ERROR
)<number, PetDetailType, AxiosError>();

// 반려 동물 수정 액션 객체 생성함수
export const modifyPetAsync = createAsyncAction(
  MODIFY_PET,
  MODIFY_PET_SUCCESS,
  MODIFY_PET_ERROR
)<PetEditType, PetDetailType, AxiosError>();

// 반려 동물 삭제 액션 객체 생성함수
export const deletePetAsync = createAsyncAction(
  DELETE_PET,
  DELETE_PET_SUCCESS,
  DELETE_PET_ERROR
)<number, any, AxiosError>();

// 반려 동물 이미지 삽입 액션 객체 생성함수
export const setProfileImageAsync = createAsyncAction(
  SET_PROFILE_IMAGE,
  SET_PROFILE_IMAGE_SUCCESS,
  SET_PROFILE_IMAGE_ERROR
)<PetProfileImage, any, AxiosError>();

// 선택된 동물 지우는 액션 객체 생성함수
export const setInitialSelectedPet = () => ({ type: SET_INITIAL_SELECTED_PET });

// saga
const getPetListSaga = createAsyncSaga(getPetListAsync, PetAPI.getPetList);
const getShelterPetListSaga = createAsyncSaga(getShelterPetListAsync, PetAPI.getShelterPetList);
const registerPetSaga = createAsyncSaga(registerPetAsync, PetAPI.registerPet);
const getPetSaga = createAsyncSaga(getPetAsync, PetAPI.getPet);
const modifyPetSaga = createAsyncSaga(modifyPetAsync, PetAPI.modifyPet);
const deletePetSaga = createAsyncSaga(deletePetAsync, PetAPI.deletePet);
const setProfileImageSaga = createAsyncSaga(setProfileImageAsync, PetAPI.setProfileImage);

// pet saga 생성
export function* petSaga() {
  yield takeEvery(GET_PET_LIST, getPetListSaga);
  yield takeEvery(GET_SHELTER_PET_LIST, getShelterPetListSaga);
  yield takeEvery(REGISTER_PET, registerPetSaga);
  yield takeEvery(GET_PET, getPetSaga);
  yield takeEvery(MODIFY_PET, modifyPetSaga);
  yield takeEvery(DELETE_PET, deletePetSaga);
  yield takeEvery(SET_PROFILE_IMAGE, setProfileImageSaga);
}

// pet actions 객체 모음
const actions = {
  getPetListAsync,
  getShelterPetListAsync,
  registerPetAsync,
  getPetAsync,
  modifyPetAsync,
  deletePetAsync,
  setProfileImageAsync
}

// pet actions type 저장
type PetAction = ActionType<typeof actions>

// pet state 선언
type PetState = {
  petList: {
    loading: boolean;
    data: PetListType[] | null;
    error: Error | null;
  },
  selectedPet: {
    loading: boolean;
    data: PetDetailType | null;
    error: Error | null;
  }
}

// pet state 초기 상태
const initialState: PetState = {
  petList: asyncState.initial(),
  selectedPet: asyncState.initial(),
}

// 반려 동물 전체 조회 reducer 생성
const getPetListReducer = createReducer<PetState, PetAction>(initialState)
.handleAction(
  transformToArray(getPetListAsync),
  createAsyncReducer(getPetListAsync, 'petList')
)

// 반려 동물 전체 조회 reducer 생성
const getShelterPetListReducer = createReducer<PetState, PetAction>(initialState)
.handleAction(
  transformToArray(getShelterPetListAsync),
  createAsyncReducer(getShelterPetListAsync, 'petList')
)

// 반려 동물 등록 reducer 생성
const registerPetReducer = createReducer<PetState, PetAction>(initialState)
.handleAction(
  transformToArray(registerPetAsync),
  createAsyncReducer(registerPetAsync, 'selectedPet')
)

// 반려 동물 전체 조회 reducer 생성
const getPetReducer = createReducer<PetState, PetAction>(initialState)
.handleAction(
  transformToArray(getPetAsync),
  createAsyncReducer(getPetAsync, 'selectedPet')
)

// 반려 동물 수정 reducer 생성
const modifyPetReducer = createReducer<PetState, PetAction>(initialState)
.handleAction(
  transformToArray(modifyPetAsync),
  createAsyncReducer(modifyPetAsync, 'selectedPet')
)

// 반려 동물 삭제 reducer 생성
const deletePetReducer = createReducer<PetState, PetAction>(initialState)
.handleAction(
  transformToArray(deletePetAsync),
  createAsyncReducer(deletePetAsync, 'selectedPet')
)

// 반려 동물 이미지 삽입 reducer 생성
const setProfileImageReducer = createReducer<PetState, PetAction>(initialState)
.handleAction(
  transformToArray(setProfileImageAsync),
  createAsyncReducer(setProfileImageAsync, 'petList')
)

// 선택된 동물 지우는 액션 reducer 생성
const setInitialSelectedPetReducer = createReducer(initialState, {
  [SET_INITIAL_SELECTED_PET]: (state, action) => ({
    ...state,
    selectedPet: {
      ...initialState.selectedPet,
    }
  })
});

const pet = createReducer<PetState, PetAction>(initialState, {
  ...getPetListReducer.handlers,
  ...getShelterPetListReducer.handlers,
  ...registerPetReducer.handlers,
  ...getPetReducer.handlers,
  ...modifyPetReducer.handlers,
  ...deletePetReducer.handlers,
  ...setProfileImageReducer.handlers,
  ...setInitialSelectedPetReducer.handlers,
});

export default pet;