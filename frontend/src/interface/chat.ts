export interface ChatType {
	myId: number;
	oppId: number;
}

export interface ResetNoticeType {
	myId: string;
	oppId: string;
}

export interface ChatMessageType {
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
	oppName: string;
	recentMsg: string;
	roomId: number;
}

export interface MessageListType{
	data: string;
	msg: string;
	myId: number;
	oppId: number;
	oppName: string;
	roomId: string;
}