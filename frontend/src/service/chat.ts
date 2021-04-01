import { ChatListType, ChatMessageType, ChatType, MessageListType, NoticeListType, ResetNoticeType } from "../interface/chat";
import { security } from "./instance";

// 채팅창 생성
export const createChat = async ( chatInfo: ChatType) => {
  return await security.post<string>("chats/check", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    chatInfo
  });
};

// 알림 다 읽음 처리
export const resetNotice = async ( noticeInfo: ResetNoticeType) => {
  return await security.put<undefined>("chats/notice", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    noticeInfo
  });
};

// 알림 목록 조회
export const getNoticeList = async ( memberId: number ) => {
  return await security.get<NoticeListType[]>("chats/notice/${memberId}", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

// 채팅방 리스트
export const getChatList = async ( memberId: number ) => {
  return await security.get<ChatListType[]>("chats/rooms", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

// 채팅방 삭제
export const deleteChat = async ( chatInfo: ChatType) => {
  return await security.delete<undefined>("chats/rooms", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

// 현재 채팅방 대화 조회
export const getChatMessage = async ({ roomId }: ChatMessageType) => {
  return await security.get<MessageListType[]>(`chats/rooms/${roomId}`,{
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};