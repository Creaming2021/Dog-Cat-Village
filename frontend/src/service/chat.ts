import { ChatListType, ChatRoomType, ChatType, 
        SelectedChatType, NoticeListType, CurrentRoomIdType } from "../interface/chat";
import { security } from "./instance";

// 채팅창 생성
export const createChat = async ( chatInfo: ChatType) => {
  return await security.post<CurrentRoomIdType>("chats/check", 
    chatInfo,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  }).then((res) => res.data);
};

// 알림 다 읽음 처리
export const resetNotice = async ( noticeInfo: ChatType) => {
  return await security.put<undefined>("chats/notice", 
    noticeInfo,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  }).then((res) => res.data);
};

// 알림 목록 조회
export const getNoticeList = async ( memberId: number ) => {
  return await security.get<NoticeListType[]>(`chats/notice/${memberId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  }).then((res) => res.data);
};

// 채팅방 리스트
export const getChatList = async ( memberId: number ) => {
  return await security.get<ChatListType[]>("chats/rooms", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    params: { memberId }
  }).then((res) => res.data);
};

// 현재 채팅방 디테일 정보 조회
export const getChatDetail = async ({ myId, oppId, roomId, endNum, startNum }: ChatRoomType ) => {
  return await security.get<SelectedChatType>(`chats/rooms/${roomId}`,{
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    params: {
      roomId, endNum, startNum, myId, oppId,
    }
  }).then((res) => res.data);
};