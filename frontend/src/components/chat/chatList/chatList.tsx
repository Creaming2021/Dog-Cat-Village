import React from 'react';
import { ChatListType } from '../../../interface/chat';
import styles from './chatList.module.css';

type ChatItemProps = {
	oppName: string,
	recentMsg: string,
	roomId: string,
	oppId: number,
	onClick: ( roomId: string, oppId: number) => void,
}

const ChatItem = ({ oppName, recentMsg, roomId, oppId, onClick }: ChatItemProps) => {
	const onClickChat = () => {
		onClick(roomId, oppId);
	}

	return (
	<div 
		className={styles['chat-item-container']}
		onClick={onClickChat}>
		<div className={styles['chat-name']}>{oppName}</div>
		<div className={styles['chat-msg']}>{recentMsg}</div>
	</div>);
}

type ChatListProps = {
	chatList: ChatListType[],
	onClick: ( roomId: string, oppId: number) => void,
}

const ChatList = ({ chatList, onClick } : ChatListProps) => {
	return (
		<div className={styles['chat-list-container']}>
			{ chatList.length === 0 
			? <div>채팅방 목록이 없습니다.</div>
			: chatList.map((chat) => 
				<ChatItem 
					key={chat.roomId}
					roomId={chat.roomId}
					oppId={chat.oppId}
					oppName={chat.oppName}
					recentMsg={chat.recentMsg}
					onClick={onClick}/>)}
		</div>);
}

export default ChatList;