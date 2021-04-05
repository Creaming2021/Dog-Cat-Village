export interface ChatType {
  myId: number;
  oppId: number;
}

export interface ChatRoomType {
  roomId: string;
  myId: number;
  oppId: number;
  endNum: number;
  startNum: number;
}

export interface NoticeListType {
  count: number;
  oppName: string;
}

export interface ChatListType {
  oppId: number;
  oppName: string;
  recentMsg: string;
  roomId: string;
}

export interface MessageListType {
  date: string;
  msg: string;
  myId: number;
  oppName: string;
}

export interface SelectedChatType {
  myId: number;
  oppId: number;
  roomId: string;
  oppName: string;
  messageList: MessageListType[];
}

export interface MessageType {
  roomId: string;
  myId: number;
  oppId: number;
  msg: string;
  date: Date;
  oppName: string;
}