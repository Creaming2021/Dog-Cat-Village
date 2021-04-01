import { AxiosError, AxiosResponse } from "axios"; 
import { ActionType, createAction, createAsyncAction, createReducer } from "typesafe-actions"; 
import { asyncState, createAsyncReducer, transformToArray } from "../lib/reducerUtils";
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from "../lib/createAsyncSaga";
import * as AdoptAPI from '../service/adopt';
import { AdoptChangeStatusType, AdoptDetailType, AdoptListType, AdoptRegisterRequestType, GetAdoptDetailRequestType } from "../interface/adopt";

// 개인 유저의 입양 신청 목록 조회 요청 액션 타입
const GET_CONSUMER_ADOPT_LIST = "consumer/GET_CONSUMER_ADOPT_LIST";
const GET_CONSUMER_ADOPT_LIST_SUCCESS = "consumer/GET_CONSUMER_ADOPT_LIST_SUCCESS";
const GET_CONSUMER_ADOPT_LIST_ERROR = "consumer/GET_CONSUMER_ADOPT_LIST_ERROR";

// 입양 신청 등록 요청 액션 타입
const REGISTER_ADOPT = "consumer/REGISTER_ADOPT";
const REGISTER_ADOPT_SUCCESS = "consumer/REGISTER_ADOPT";
const REGISTER_ADOPT_ERROR = "consumer/REGISTER_ADOPT_ERROR";

// 개인 유저의 입양 신청 디테일 정보 조회 요청 액션 타입
const GET_CONSUMER_ADOPT_DETAIL = "consumer/GET_CONSUMER_ADOPT_DETAIL";
const GET_CONSUMER_ADOPT_DETAIL_SUCCESS = "consumer/GET_CONSUMER_ADOPT_DETAIL_SUCCESS";
const GET_CONSUMER_ADOPT_DETAIL_ERROR = "consumer/GET_CONSUMER_ADOPT_DETAIL_ERROR";

// 보호소 유저의 입양 신청 목록 조회 요청 액션 타입
const GET_SHELTER_ADOPT_LIST = "shelter/GET_SHELTER_ADOPT_LIST";
const GET_SHELTER_ADOPT_LIST_SUCCESS = "shelter/GET_SHELTER_ADOPT_LIST_SUCCESS";
const GET_SHELTER_ADOPT_LIST_ERROR = "shelter/GET_SHELTER_ADOPT_LIST_ERROR";

// 보호소 유저의 입양 신청 디테일 정보 조회 요청 액션 타입
const GET_SHELTER_ADOPT_DETAIL = "shelter/GET_SHELTER_ADOPT_DETAIL";
const GET_SHELTER_ADOPT_DETAIL_SUCCESS = "shelter/GET_SHELTER_ADOPT_DETAIL_SUCCESS";
const GET_SHELTER_ADOPT_DETAIL_ERROR = "shelter/GET_SHELTER_ADOPT_DETAIL_ERROR";

// 입양 신청 상태 변경 요청 요청 액션 타입
const CHANGE_ADOPT_STATUS = "shelter/CHANGE_ADOPT_STATUS";
const CHANGE_ADOPT_STATUS_SUCCESS = "shelter/CHANGE_ADOPT_STATUS_SUCCESS";
const CHANGE_ADOPT_STATUS_ERROR = "shelter/CHANGE_ADOPT_STATUS_ERROR";

// 선택된 입양 신청서 지우는 액션 타입
const SET_INITIAL_ADOPT_DETAIL = "adopt/SET_INITIAL_ADOPT_DETAIL";

// 개인 유저의 입양 신청 목록 조회 요청 액션 객체 생성함수
export const getConsumerAdoptListAsync = createAsyncAction( 
  GET_CONSUMER_ADOPT_LIST, 
  GET_CONSUMER_ADOPT_LIST_SUCCESS, 
  GET_CONSUMER_ADOPT_LIST_ERROR 
)<number, AxiosResponse<AdoptListType[]>, AxiosError>(); 

// 입양 신청 등록 요청 액션 객체 생성함수
export const registerAdoptAsync = createAsyncAction( 
  REGISTER_ADOPT, 
  REGISTER_ADOPT_SUCCESS, 
  REGISTER_ADOPT_ERROR 
)<AdoptRegisterRequestType, AxiosResponse<undefined>, AxiosError>(); 

// 개인 유저의 입양 신청 디테일 정보 조회 요청 액션 객체 생성함수
export const getConsumerAdoptDetailAsync = createAsyncAction( 
  GET_CONSUMER_ADOPT_DETAIL, 
  GET_CONSUMER_ADOPT_DETAIL_SUCCESS, 
  GET_CONSUMER_ADOPT_DETAIL_ERROR 
)<GetAdoptDetailRequestType, AxiosResponse<AdoptDetailType>, AxiosError>(); 

// 보호소 유저의 입양 신청 목록 조회 요청 액션 객체 생성함수
export const getShleterAdoptListAsync = createAsyncAction( 
  GET_SHELTER_ADOPT_LIST, 
  GET_SHELTER_ADOPT_LIST_SUCCESS, 
  GET_SHELTER_ADOPT_LIST_ERROR 
)<number, AxiosResponse<AdoptListType[]>, AxiosError>();

// 보호소 유저의 입양 신청 디테일 정보 조회 요청 액션 객체 생성함수
export const getShelterAdoptDetailAsync = createAsyncAction( 
  GET_SHELTER_ADOPT_DETAIL, 
  GET_SHELTER_ADOPT_DETAIL_SUCCESS, 
  GET_SHELTER_ADOPT_DETAIL_ERROR 
)<GetAdoptDetailRequestType, AxiosResponse<AdoptDetailType>, AxiosError>();

// 입양 신청 상태 변경 요청 액션 객체 생성함수
export const changeAdoptStatusAsync = createAsyncAction( 
  CHANGE_ADOPT_STATUS, 
  CHANGE_ADOPT_STATUS_SUCCESS, 
  CHANGE_ADOPT_STATUS_ERROR 
)<AdoptChangeStatusType, AxiosResponse<AdoptDetailType>, AxiosError>(); 

// 선택된 입양 신청서 지우는 액션 객체 생성함수
export const setInitialAdoptDetail = () => ({ type: SET_INITIAL_ADOPT_DETAIL });

// saga
const getConsumerAdoptListSaga = createAsyncSaga(getConsumerAdoptListAsync, AdoptAPI.getConsumerAdoptList);
const registerAdoptSaga = createAsyncSaga(registerAdoptAsync, AdoptAPI.registerAdopt);
const getConsumerAdoptDetailSaga = createAsyncSaga(getConsumerAdoptDetailAsync, AdoptAPI.getConsumerAdoptDetail);
const getShleterAdoptListSaga = createAsyncSaga(getShleterAdoptListAsync, AdoptAPI.getShleterAdoptList);
const getShelterAdoptDetailSaga = createAsyncSaga(getShelterAdoptDetailAsync, AdoptAPI.getShelterAdoptDetail);
const changeAdoptStatusSaga = createAsyncSaga(changeAdoptStatusAsync, AdoptAPI.changeAdoptStatus);

// adopt saga 생성
export function* adoptSaga() {
  yield takeEvery(GET_CONSUMER_ADOPT_LIST, getConsumerAdoptListSaga);
  yield takeEvery(REGISTER_ADOPT, registerAdoptSaga);
  yield takeEvery(GET_CONSUMER_ADOPT_DETAIL, getConsumerAdoptDetailSaga);
  yield takeEvery(GET_SHELTER_ADOPT_LIST, getShleterAdoptListSaga);
  yield takeEvery(GET_SHELTER_ADOPT_DETAIL, getShelterAdoptDetailSaga);
  yield takeEvery(CHANGE_ADOPT_STATUS_SUCCESS, changeAdoptStatusSaga);
}

// adopt actions 객체
const actions = {
  getConsumerAdoptListAsync,
  registerAdoptAsync,
  getConsumerAdoptDetailAsync,
  getShleterAdoptListAsync,
  getShelterAdoptDetailAsync,
  changeAdoptStatusAsync
}

// adopt actions type 저장
type AdoptAction = ActionType<typeof actions>

// adopt state 선언
type AdoptState = {
  adoptList: {
    loading: boolean; 
    data: AdoptListType[] | null; 
    error: Error | null; 
  },
  selectedAdopt: {
    loading: boolean; 
    data: AdoptDetailType | null; 
    error: Error | null; 
  },
}

// adopt state 초기 상태
const initialState: AdoptState = {
  adoptList: asyncState.initial(),
  selectedAdopt: asyncState.initial(),
}

// 개인 유저의 입양 신청 목록 조회 reducer 생성
const getConsumerAdoptListReducer = createReducer<AdoptState, AdoptAction>(initialState)
.handleAction(
  transformToArray(getConsumerAdoptListAsync),
  createAsyncReducer(getConsumerAdoptListAsync, 'adoptList')
)

// 입양 신청 등록 reducer 생성
const registerAdoptReducer = createReducer<AdoptState, AdoptAction>(initialState)
.handleAction(
  transformToArray(registerAdoptAsync),
  createAsyncReducer(registerAdoptAsync, 'selectedAdopt')
)

// 개인 유저의 입양 신청 디테일 정보 조회 reducer 생성
const getConsumerAdoptDetailReducer = createReducer<AdoptState, AdoptAction>(initialState)
.handleAction(
  transformToArray(getConsumerAdoptDetailAsync),
  createAsyncReducer(getConsumerAdoptDetailAsync, 'selectedAdopt')
)

// 보호소 유저의 입양 신청 목록 조회 reducer 생성
const getShleterAdoptListReducer = createReducer<AdoptState, AdoptAction>(initialState)
.handleAction(
  transformToArray(getShleterAdoptListAsync),
  createAsyncReducer(getShleterAdoptListAsync, 'adoptList')
)

// 보호소 유저의 입양 신청 디테일 정보 조회 reducer 생성
const getShelterAdoptDetailReducer = createReducer<AdoptState, AdoptAction>(initialState)
.handleAction(
  transformToArray(getShelterAdoptDetailAsync),
  createAsyncReducer(getShelterAdoptDetailAsync, 'selectedAdopt')
)

// 입양 신청 상태 변경 요청 reducer 생성
const changeAdoptStatusReducer = createReducer<AdoptState, AdoptAction>(initialState)
.handleAction(
  transformToArray(changeAdoptStatusAsync),
  createAsyncReducer(changeAdoptStatusAsync, 'selectedAdopt')
)

// 선택된 입양 신청서 지우는 액션 reducer 생성
const setInitialAdoptDetailReducer = createReducer(initialState, {
  [SET_INITIAL_ADOPT_DETAIL]: (state, action) => ({
    ...state,
    selectedAdopt: {
      ...initialState.selectedAdopt,
    }
  })
});

const adopt = createReducer<AdoptState, AdoptAction>(initialState, {
  ...getConsumerAdoptListReducer.handlers,
  ...registerAdoptReducer.handlers,
  ...getConsumerAdoptDetailReducer.handlers,
  ...getShleterAdoptListReducer.handlers,
  ...getShelterAdoptDetailReducer.handlers,
  ...changeAdoptStatusReducer.handlers,
  ...setInitialAdoptDetailReducer.handlers,
});

export default adopt;