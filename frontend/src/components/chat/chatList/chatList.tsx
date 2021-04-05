import React from 'react';
import { ChatListType } from '../../../interface/chat';

type ChatListProps = {
	chatList: ChatListType[],
	onClick: ( roomId: string, oppId: number) => void,
}

const ChatList = ({ chatList, onClick } : ChatListProps) => {
	return (<>
		{ chatList.map((chat) => 
			<div 
				key={chat.roomId} 
				onClick={() => onClick(chat.roomId, chat.oppId)}> 
					{chat.roomId} / {chat.oppName} / {chat.recentMsg}</div>)}
	</>);
}

export default ChatList;