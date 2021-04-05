import React from 'react';
import { SelectedChatType } from '../../../interface/chat';

type ChatRoomProps = {
	selectedChat: SelectedChatType | undefined,
}

const ChatRoom = ({ selectedChat }: ChatRoomProps) => {
	return (
		<>
			{selectedChat?.messageList.map( (message, index) => {
				<div key={index}>
					{message.oppName} / {message.msg} / {message.date}
				</div>
			})}
	</>);
}

export default ChatRoom;