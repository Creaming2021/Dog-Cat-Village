import { AxiosError, AxiosResponse } from "axios"; 
import { ActionType, createAction, createAsyncAction, createReducer } from "typesafe-actions"; 
import { asyncState, createAsyncReducer, transformToArray } from "../lib/reducerUtils";
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from "../lib/createAsyncSaga";
import * as BlockchainAPI from '../service/blockchain';
import { registerWalletType, transactionInfoType, walletInfoType, getTransactionListType } from "../interface/blockchain";

// 계정 생성 액션 타입
const CREATE_ACCOUNT = 'blockchain/CREATE_ACCOUNT';
const CREATE_ACCOUNT_SUCCESS = 'blockchain/CREATE_ACCOUNT_SUCCESS';
const CREATE_ACCOUNT_ERROR = 'blockchain/CREATE_ACCOUNT_ERROR';

// 코인 잔액 조회 액션 타입
const GET_TOKEN_BALANCE = 'blockchain/GET_TOKEN_BALANCE';
const GET_TOKEN_BALANCE_SUCCESS = 'blockchain/GET_TOKEN_BALANCE_SUCCESS';
const GET_TOKEN_BALANCE_ERROR = 'blockchain/GET_TOKEN_BALANCE_ERROR';

// 트랜잭션 (코인 전송) 생성하기 액션 타입
const SEND_TRANSACTION = 'blockchain/SEND_TRANSACTION';
const SEND_TRANSACTION_SUCCESS = 'blockchain/SEND_TRANSACTION_SUCCESS';
const SEND_TRANSACTION_ERROR = 'blockchain/SEND_TRANSACTION_ERROR';

// 지갑 정보 조회 액션 타입
const GET_WALLET_INFO = 'blockchain/GET_WALLET_INFO';
const GET_WALLET_INFO_SUCCESS = 'blockchain/GET_WALLET_INFO_SUCCESS';
const GET_WALLET_INFO_ERROR = 'blockchain/GET_WALLET_INFO_ERROR';

// 지갑 정보 등록 액션 타입
const SET_WALLET_INFO = 'blockchain/SET_WALLET_INFO';
const SET_WALLET_INFO_SUCCESS = 'blockchain/SET_WALLET_INFO_SUCCESS';
const SET_WALLET_INFO_ERROR = 'blockchain/SET_WALLET_INFO_ERROR';

// 마블 코인 거래 내역 리스트 액션 타입
const GET_TRANSACTION_LIST = 'blockchain/GET_TRANSACTION_LIST';
const GET_TRANSACTION_LIST_SUCCESS = 'blockchain/GET_TRANSACTION_LIST_SUCCESS';
const GET_TRANSACTION_LIST_ERROR = 'blockchain/GET_TRANSACTION_LIST_ERROR';

// 계정 생성 액션 객체 생성함수
export const createAccountAsync = createAsyncAction( 
  CREATE_ACCOUNT, 
  CREATE_ACCOUNT_SUCCESS, 
  CREATE_ACCOUNT_ERROR 
)<any, Account, AxiosError>();

// 코인 잔액 조회 액션 객체 생성함수
export const getTokenBalanceAsync = createAsyncAction( 
  GET_TOKEN_BALANCE, 
  GET_TOKEN_BALANCE_SUCCESS, 
  GET_TOKEN_BALANCE_ERROR 
)<any, AxiosResponse<any>, AxiosError>();

// 트랜잭션 (코인 전송) 생성하기 액션 객체 생성함수
export const sendTransactionAsync = createAsyncAction( 
  SEND_TRANSACTION, 
  SEND_TRANSACTION_SUCCESS, 
  SEND_TRANSACTION_ERROR 
)<any, AxiosResponse<any>, AxiosError>();

// 지갑 정보 조회 액션 객체 생성함수
export const getWalletInfoAsync = createAsyncAction( 
  GET_WALLET_INFO, 
  GET_WALLET_INFO_SUCCESS, 
  GET_WALLET_INFO_ERROR 
)<any, AxiosResponse<any>, AxiosError>();

// 지갑 정보 등록 액션 객체 생성함수
export const setWalletInfoAsync = createAsyncAction( 
  SET_WALLET_INFO, 
  SET_WALLET_INFO_SUCCESS, 
  SET_WALLET_INFO_ERROR 
)<any, AxiosResponse<any>, AxiosError>();

// 마블 코인 거래 내역 리스트 액션 객체 생성함수
export const getTransactionListAsync = createAsyncAction( 
  GET_TRANSACTION_LIST, 
  GET_TRANSACTION_LIST_SUCCESS, 
  GET_TRANSACTION_LIST_ERROR 
)<any, AxiosResponse<any>, AxiosError>();

// saga
const createAccountSaga = createAsyncSaga(createAccountAsync, BlockchainAPI.createAccount);
const getTokenBalanceSaga = createAsyncSaga(getTokenBalanceAsync, BlockchainAPI.getTokenBalance);
const sendTransactionSaga = createAsyncSaga(sendTransactionAsync, BlockchainAPI.sendTransaction);
const getWalletInfoSaga = createAsyncSaga(getWalletInfoAsync, BlockchainAPI.getWalletInfo);
const setWalletInfoSaga = createAsyncSaga(setWalletInfoAsync, BlockchainAPI.setWalletInfo);
const getTransactionListSaga = createAsyncSaga(getTransactionListAsync, BlockchainAPI.getTransactionList);

// blockchain saga 생성


// blockchain actions 객체 모음


// blockchain actions type 저장


// blockchain state 선언


// blockchain state 초기 상태


// 계정 생성 요청 리듀서


// 코인 잔액 조회 요청 리듀서


// 트랜잭션 (코인 전송) 생성하기 요청 리듀서


// 지갑 정보 조회 요청 리듀서


// 지갑 정보 등록 요청 리듀서


// 마블 코인 거래 내역 리스트 요청 리듀서


// reducer 함수

