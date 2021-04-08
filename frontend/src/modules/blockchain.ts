import { AxiosError } from "axios"; 
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions"; 
import { asyncState, createAsyncReducer, transformToArray } from "../lib/reducerUtils";
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from "../lib/createAsyncSaga";
import * as BlockchainAPI from '../service/blockchain';
import { setWalletType, TransactionAddressRequireType, TransactionAddressType, TransactionListType, WalletType } from "../interface/blockchain";

// 지갑 정보 조회 액션 타입
const GET_WALLET_INFO = 'blockchain/GET_WALLET_INFO';
const GET_WALLET_INFO_SUCCESS = 'blockchain/GET_WALLET_INFO_SUCCESS';
const GET_WALLET_INFO_ERROR = 'blockchain/GET_WALLET_INFO_ERROR';

// 지갑 정보 등록 액션 타입
const SET_WALLET_INFO = 'blockchain/SET_WALLET_INFO';
const SET_WALLET_INFO_SUCCESS = 'blockchain/SET_WALLET_INFO_SUCCESS';
const SET_WALLET_INFO_ERROR = 'blockchain/SET_WALLET_INFO_ERROR';

// 아이디를 주소로 변환 액션 타입
const CHANGE_ID_TO_ADDRESS = 'blockchain/CHANGE_ID_TO_ADDRESS';
const CHANGE_ID_TO_ADDRESS_SUCCESS = 'blockchain/CHANGE_ID_TO_ADDRESS_SUCCESS';
const CHANGE_ID_TO_ADDRESS_ERROR = 'blockchain/CHANGE_ID_TO_ADDRESS_ERROR';

// 마블 코인 거래 내역 리스트 액션 타입
const GET_TRANSACTION_LIST = 'blockchain/GET_TRANSACTION_LIST';
const GET_TRANSACTION_LIST_SUCCESS = 'blockchain/GET_TRANSACTION_LIST_SUCCESS';
const GET_TRANSACTION_LIST_ERROR = 'blockchain/GET_TRANSACTION_LIST_ERROR';

// 지갑 충전하기 액션 타입
const CHARGE_COIN = 'blockchain/CHARGE_COIN';
const CHARGE_COIN_SUCCESS = 'blockchain/CHARGE_COIN_SUCCESS';
const CHARGE_COIN_ERROR = 'blockchain/CHARGE_COIN_ERROR';

// 지갑 정보 조회 액션 객체 생성함수
export const getWalletInfoAsync = createAsyncAction( 
  GET_WALLET_INFO, 
  GET_WALLET_INFO_SUCCESS, 
  GET_WALLET_INFO_ERROR 
)<number, WalletType, AxiosError>();

// 지갑 정보 등록 액션 객체 생성함수
export const setWalletInfoAsync = createAsyncAction( 
  SET_WALLET_INFO, 
  SET_WALLET_INFO_SUCCESS, 
  SET_WALLET_INFO_ERROR 
)<setWalletType, any, AxiosError>();

// 아이디를 주소로 변환
export const changeIdToAddressAsync = createAsyncAction(
  CHANGE_ID_TO_ADDRESS,
  CHANGE_ID_TO_ADDRESS_SUCCESS,
  CHANGE_ID_TO_ADDRESS_ERROR
)<TransactionAddressRequireType, TransactionAddressType, AxiosError>();

// 마블 코인 거래 내역 리스트 액션 객체 생성함수
export const getTransactionListAsync = createAsyncAction( 
  GET_TRANSACTION_LIST, 
  GET_TRANSACTION_LIST_SUCCESS, 
  GET_TRANSACTION_LIST_ERROR 
)<string, TransactionListType, AxiosError>();

// 지갑 충전하기 액션 객체 생성함수
export const chargeCoinAsync = createAsyncAction( 
  CHARGE_COIN, 
  CHARGE_COIN_SUCCESS, 
  CHARGE_COIN_ERROR 
)<string, any, AxiosError>();

// saga
const getWalletInfoSaga = createAsyncSaga(getWalletInfoAsync, BlockchainAPI.getWalletInfo);
const setWalletInfoSaga = createAsyncSaga(setWalletInfoAsync, BlockchainAPI.setWalletInfo);
const changeIdToAddressSaga = createAsyncSaga(changeIdToAddressAsync, BlockchainAPI.changeIdToAddress);
const getTransactionListSaga = createAsyncSaga(getTransactionListAsync, BlockchainAPI.getTransactionList);
const chargeCoinSaga = createAsyncSaga(chargeCoinAsync, BlockchainAPI.chargeCoin);

// blockchain saga 생성
export function* blockchainSaga() {
  yield takeEvery(GET_WALLET_INFO, getWalletInfoSaga);
  yield takeEvery(CHANGE_ID_TO_ADDRESS, changeIdToAddressSaga);
  yield takeEvery(SET_WALLET_INFO, setWalletInfoSaga);
  yield takeEvery(GET_TRANSACTION_LIST, getTransactionListSaga);
  yield takeEvery(CHARGE_COIN, chargeCoinSaga);
}

// blockchain actions 객체 모음
const actions = {
  getWalletInfoAsync,
  changeIdToAddressAsync,
  setWalletInfoAsync,
  getTransactionListAsync,
  chargeCoinAsync
};

// blockchain actions type 저장
type BlockchainAction = ActionType<typeof actions>

// blockchain state 선언
type BlockchainState = {
  walletInfo: {
    loading: boolean;
    data: WalletType | null;
    error: Error | null;
  },
  transactionList: {
    loading: boolean;
    data: TransactionListType | null;
    error: Error | null;
  },
  changeTransaction: {
    loading: boolean;
    data: TransactionAddressType | null;
    error: Error | null;
  },
  chargedCoin : {
    loading: boolean;
    data: any | null;
    error: Error | null;
  }
}

// blockchain state 초기 상태
const initialState: BlockchainState = {
  walletInfo: asyncState.initial(),
  transactionList: asyncState.initial(),
  changeTransaction: asyncState.initial(),
  chargedCoin: asyncState.initial(),
}

// 지갑 정보 조회 요청 리듀서
const getWalletInfoReducer = createReducer<BlockchainState, BlockchainAction>(initialState)
.handleAction(
  transformToArray(getWalletInfoAsync),
  createAsyncReducer(getWalletInfoAsync, "walletInfo")
);

// 지갑 정보 등록 요청 리듀서
const setWalletInfoReducer = createReducer<BlockchainState, BlockchainAction>(initialState)
.handleAction(
  transformToArray(setWalletInfoAsync),
  createAsyncReducer(setWalletInfoAsync, "walletInfo")
);

// 아이디를 주소로 변환
const changeIdToAddressReducer = createReducer<BlockchainState, BlockchainAction>(initialState)
.handleAction(
  transformToArray(changeIdToAddressAsync),
  createAsyncReducer(changeIdToAddressAsync, "changeTransaction")
);

// 마블 코인 거래 내역 리스트 요청 리듀서
const getTransactionListReducer = createReducer<BlockchainState, BlockchainAction>(initialState)
.handleAction(
  transformToArray(getTransactionListAsync),
  createAsyncReducer(getTransactionListAsync, "transactionList")
);

// 지갑 충전하기 요청 리듀서
const chargeCoinReducer = createReducer<BlockchainState, BlockchainAction>(initialState)
.handleAction(
  transformToArray(chargeCoinAsync),
  createAsyncReducer(chargeCoinAsync, "chargedCoin")
);

// reducer 함수
const blockchain = createReducer<BlockchainState, BlockchainAction>(initialState, {
  ...getWalletInfoReducer.handlers,
  ...setWalletInfoReducer.handlers,
  ...changeIdToAddressReducer.handlers,
  ...getTransactionListReducer.handlers,
  ...chargeCoinReducer.handlers,
});

export default blockchain;