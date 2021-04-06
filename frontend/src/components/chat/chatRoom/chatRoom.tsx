import React, { useEffect } from 'react';
import { MessageListType, SelectedChatType } from '../../../interface/chat';
import styles from './chatRoom.module.css';
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type messageProps = {
	message: MessageListType
}

const Message = ({ message }: messageProps) => {
	const { oppName, msg, date } = message;

	return (
	<div className={styles['message-box']}>
		<div className={styles.name}>{oppName}</div>
		<div className={styles['name-box']}>
			<div className={styles.msg}>{msg}</div>
			<div className={styles.date}>{date.substring(0,10)}</div>
		</div>
	</div>);
}

type ChatRoomProps = {
	selectedChat: SelectedChatType,
	onSubmitSendMessage: () => void,
	message: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ChatRoom = ({ selectedChat, onSubmitSendMessage, message, onChange }: ChatRoomProps) => {
	
	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.nativeEvent.key === "Enter") {
      onSubmitSendMessage();
    }
  }
	
	return (
		<div className={styles['chat-room-container']}>
			{ selectedChat.messageList.length === 0
			? <div>채팅방을 열어주세요.</div>
			:	<>
				<div className={styles['message-container']}>
					{selectedChat.messageList.map((message, index) => 
						<Message key={index} message={message}/>
						)}
				</div>
				<div>
					<input 
						className={styles.input}
						name="msg" 
						value={message} 
						onChange={onChange}
						onKeyDown={onKeyDown}/>
					<FontAwesomeIcon 
						className={styles.icon}
						icon={faArrowCircleUp}
						onClick={onSubmitSendMessage} />
				</div>
				</>
			}
		</div>
	);
}

export default ChatRoom;