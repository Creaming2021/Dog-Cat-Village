import { AxiosError, AxiosResponse } from "axios";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from "../lib/reducerUtils";
import { takeEvery } from "redux-saga/effects";
import createAsyncSaga from "../lib/createAsyncSaga";
import * as ChatAPI from "../service/chat";
import {
  ChatListType,
  ChatRoomType,
  ChatType,
  MessageListType,
  NoticeListType,
  SelectedChatType,
} from "../interface/chat";

// 채팅방 생성 액션 타입
const CREATE_CHAT = "chat/CREATE_CHAT";
const CREATE_CHAT_SUCCESS = "chat/CREATE_CHAT_SUCCESS";
const CREATE_CHAT_ERROR = "chat/CREATE_CHAT_ERROR";

// 알림 다 읽음 처리 액션 타입
const RESET_NOTICE = "chat/RESET_NOTICE";
const RESET_NOTICE_SUCCESS = "chat/RESET_NOTICE_SUCCESS";
const RESET_NOTICE_ERROR = "chat/RESET_NOTICE_ERROR";

// 알림 목록 조회 액션 타입
const GET_NOTICE_LIST = "chat/GET_NOTICE_LIST";
const GET_NOTICE_LIST_SUCCESS = "chat/GET_NOTICE_LIST_SUCCESS";
const GET_NOTICE_LIST_ERROR = "chat/GET_NOTICE_LIST_ERROR";

// 채팅방 리스트 액션 타입
const GET_CHAT_LIST = "chat/GET_CHAT_LIST";
const GET_CHAT_LIST_SUCCESS = "chat/GET_CHAT_LIST_SUCCESS";
const GET_CHAT_LIST_ERROR = "chat/GET_CHAT_LIST_ERROR";

// 채팅방 디테일 정보 조회 액션 타입
const GET_CHAT_DETAIL = "chat/GET_CHAT_DETAIL";
const GET_CHAT_DETAIL_SUCCESS = "chat/GET_CHAT_DETAIL_SUCCESS";
const GET_CHAT_DETAIL_ERROR = "chat/GET_CHAT_DETAIL_ERROR";

// 채팅방 생성 액션 객체 생성함수
export const createChatAsync = createAsyncAction(
  CREATE_CHAT,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_ERROR
)<ChatType, AxiosResponse<string>, AxiosError>();

// 알림 다 읽음 처리 액션 객체 생성함수
export const resetNoticeAsync = createAsyncAction(
  RESET_NOTICE,
  RESET_NOTICE_SUCCESS,
  RESET_NOTICE_ERROR
)<ChatType, AxiosResponse<undefined>, AxiosError>();

// 알림 목록 조회 액션 객체 생성함수
export const getNoticeListAsync = createAsyncAction(
  GET_NOTICE_LIST,
  GET_NOTICE_LIST_SUCCESS,
  GET_NOTICE_LIST_ERROR
)<number, AxiosResponse<NoticeListType[]>, AxiosError>();

// 채팅방 리스트 액션 객체 생성함수
export const getChatListAsync = createAsyncAction(
  GET_CHAT_LIST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_ERROR
)<number, AxiosResponse<ChatListType[]>, AxiosError>();

// 현재 채팅방 대화 조회 액션 객체 생성함수
export const getChatDetailAsync = createAsyncAction(
  GET_CHAT_DETAIL,
  GET_CHAT_DETAIL_SUCCESS,
  GET_CHAT_DETAIL_ERROR
)<ChatRoomType, AxiosResponse<SelectedChatType>, AxiosError>();

//saga
const createChatSaga = createAsyncSaga(createChatAsync, ChatAPI.createChat);
const resetNoticeSaga = createAsyncSaga(resetNoticeAsync, ChatAPI.resetNotice);
const getNoticeListSaga = createAsyncSaga(getNoticeListAsync, ChatAPI.getNoticeList);
const getChatListSaga = createAsyncSaga(getChatListAsync, ChatAPI.getChatList);
const getChatDetailSaga = createAsyncSaga(getChatDetailAsync, ChatAPI.getChatDetail);

// chat saga 생성
export function* chatSaga() {
  yield takeEvery(CREATE_CHAT, createChatSaga);
  yield takeEvery(RESET_NOTICE, resetNoticeSaga);
  yield takeEvery(GET_NOTICE_LIST, getNoticeListSaga);
  yield takeEvery(GET_CHAT_LIST, getChatListSaga);
  yield takeEvery(GET_CHAT_DETAIL, getChatDetailSaga);
}

// chat acions 객체 모음
const actions = {
  createChatAsync,
  resetNoticeAsync,
  getNoticeListAsync,
  getChatListAsync,
  getChatDetailAsync,
};

// chat actions type 저장
type ChatAction = ActionType<typeof actions>;

// chat state 선언
type ChatState = {
  selectedChat: {
    loading: boolean;
    data: SelectedChatType | null;
    error: Error | null;
  };
  chatList: {
    loading: boolean;
    data: ChatListType[] | null;
    error: Error | null;
  };
  messageList: {
    loading: boolean;
    data: MessageListType[] | null;
    error: Error | null;
  };
  noticeList: {
    loading: boolean;
    data: NoticeListType[] | null;
    error: Error | null;
  };
};

// chat state 초기 상태
const initialState: ChatState = {
  selectedChat: asyncState.initial(),
  chatList: asyncState.initial(),
  messageList: asyncState.initial(),
  noticeList: asyncState.initial(),
};

// 채팅방 생성 reducer 생성
const createChatReducer = createReducer<ChatState, ChatAction>(initialState).
handleAction(
  transformToArray(createChatAsync),
  createAsyncReducer(createChatAsync, "selectedChat")
);

// 알림 다 읽음 처리 reducer 생성
const resetNoticeReducer = createReducer<ChatState, ChatAction>(initialState)
.handleAction(
  transformToArray(resetNoticeAsync),
  createAsyncReducer(resetNoticeAsync, "noticeList")
);

// 알림 목록 조회 reducer 생성
const getNoticeListReducer = createReducer<ChatState, ChatAction>(initialState)
.handleAction(
  transformToArray(getNoticeListAsync),
  createAsyncReducer(getNoticeListAsync, "noticeList")
);

// 채팅방 리스트 reducer 생성
const getChatListReducer = createReducer<ChatState, ChatAction>(initialState)
.handleAction(
  transformToArray(getChatListAsync),
  createAsyncReducer(getChatListAsync, "chatList")
);

// 현재 채팅방 대화 조회 reducer 생성
const getChatDetailReducer = createReducer<ChatState, ChatAction>(initialState)
.handleAction(
  transformToArray(getChatDetailAsync),
  createAsyncReducer(getChatDetailAsync, "selectedChat")
);

// chat reducer 생성
const chat = createReducer<ChatState, ChatAction>(initialState, {
  ...createChatReducer.handlers,
  ...resetNoticeReducer.handlers,
  ...getNoticeListReducer.handlers,
  ...getChatListReducer.handlers,
  ...getChatDetailReducer.handlers,
});

export default chat;