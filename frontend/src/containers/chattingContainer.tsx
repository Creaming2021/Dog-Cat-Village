import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sockjs from "sockjs-client";
import Stomp from "stompjs";
import ChatList from "../components/chat/chatList/chatList";
import ChatRoom from "../components/chat/chatRoom/chatRoom";
import { MessageType } from "../interface/chat";
import { RootState } from "../modules";
import * as ChatAction from '../modules/chat';
import styles from './container.module.css';

type MessageState = {
  message: MessageType,
  send: boolean,
}

type ChattingContainerProps = {
  listSet: boolean,
  selectedShelterId?: number,
}

const ChattingContainer = ({ listSet, selectedShelterId }: ChattingContainerProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const chatList = useSelector((state: RootState) => state.chat.chatList);
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);
  const currentRoomId = useSelector((state: RootState) => state.chat.currentRoomId);
  const dispatch = useDispatch();

  const initialMessage = {
    roomId: selectedChat.data?.roomId || '',
    myId: selectedChat.data?.myId || -1,
    oppId: selectedChat.data?.oppId || -1,
    oppName: selectedChat.data?.oppName || '',
    msg: '',
    date: '',
  }

  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState<any>(null);
  const [message, setMessage] = useState<MessageState>({ message: initialMessage, send: false});

  // 메세지 입력 수정
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMessage({
      ...message,
      message: {
        ...message.message,
        [name]: value,
      }
    });
  }

  // 채팅 리스트 불러오기
  useEffect(() => {
    createSocket();
    getChatList();
    // 채팅 시작하기
    if( member.data && selectedShelterId ) {
      dispatch(ChatAction.createChatAsync.request(
        { myId: member.data?.memberId, oppId: selectedShelterId }));
    }
  }, []);

  useEffect(() => {
    // 채팅방 들어가기
    if(currentRoomId.data && selectedShelterId) 
      getChatDetail(currentRoomId.data.roomId, selectedShelterId);
  }, [currentRoomId]);

  // 소켓 연결하기
  useEffect(() => {
    connectSocket();
  }, [stompClient]);  

  // 해당 채팅방에서 전송할 메세지 객체 셋팅하기
  useEffect(() => {
    if(stompClient !== null && selectedChat.data !== null) {
      setMessage({
        message: initialMessage,
        send: false,
      });
    }
  }, [selectedChat]);

  // 전송 요청하기
  useEffect(() => {
    if(message.send){
      sendMessage();
    }
  }, [message]);

  // 소켓 객체 생성
  const createSocket = () => {
    const serverUrl = "http://j4b106.p.ssafy.io/api/ws";
    let socket = new Sockjs(serverUrl);
    console.log("sockjs가 준 socket", socket);

    if (stompClient !== null) {
      stompClient.disconnect();
      setStompClient(Stomp.over(socket));
    } else {
      setStompClient(Stomp.over(socket));
    }
  };

  // 소켓 연결
  const connectSocket = () => {
    if( stompClient !== null && !loading ) {
      setLoading(true);

      stompClient.connect(
        {},
        (frame: any) => {
          console.log("소켓 연결 성공", frame);
        },
        (error: any) => {
          console.log("소켓 연결 실패");
        }
      );
    }
  }

  // 채팅 리스트 불러오기
  const getChatList = () => {
    if(member.data) {
      dispatch(ChatAction.getChatListAsync.request(member.data.memberId));
    }
  }

  // 메세지 전송 버튼 클릭
  const onSubmitSendMessage = () => {
    // 한국 시간 변경
    const curr = new Date();
    const utc = curr.getTime();
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    setMessage({
      ...message,
      message: {
        ...message.message,
        date: kr_curr.toString(),
      },
      send: true,
    });
  }

  // 메세지 전송
  const sendMessage = () => {
    stompClient.send("/app/receive", {}, JSON.stringify(message.message));

    setMessage({ message: initialMessage, send: false});
  };

  // 서버 메시지 end point 구독
  const subscribeChattingRoom = () => {
    stompClient.subscribe(
      `/message/${selectedChat.data?.roomId}`,
      (res: any) => {
        const data = JSON.parse(res.body);
        addMessageList({
          date: data.date,
          msg: data.msg,
          myId: data.myId,
          oppName: data.oppName,
          roomId: data.roomId,
          oppId: data.oppId,
        });
      }
    );
  }

  // 채팅방 메세지 리스트에 추가 하는 액션
  const addMessageList = (newMessage: MessageType) => {
    dispatch(ChatAction.addMessageList(newMessage));
  }

  // 채팅방 하나 클릭
  const onClickChattingRoom = (roomId: string, oppId: number) => {
    getChatDetail(roomId, oppId);
    resetNotice(oppId);
  }

  // chat detail 불러오는 요청 보내기
  const getChatDetail = (id: string, oppId: number) => {
    dispatch(ChatAction.getChatDetailAsync.request({
      roomId: id,
      myId: member.data?.memberId || -1,
      oppId: oppId,
      endNum: 100,
      startNum: 0,
    }));
  }

  // 알람 끄는 요청
  const resetNotice = (oppId: number) => {
    dispatch(ChatAction.resetNoticeAsync.request({ 
      myId : member.data?.memberId || -1, 
      oppId : oppId,
    }));
  };

  return (
    <div className={styles['chatting-container']}>
      { listSet &&
        <ChatList 
          chatList={chatList.data || []}
          onClick={onClickChattingRoom}/>
      }      
      { selectedChat.data !== null &&
        <ChatRoom
          selectedChat={selectedChat.data}
          onSubmitSendMessage={onSubmitSendMessage}
          message={message.message.msg}
          onChange={onChange}
          subscribeChattingRoom={subscribeChattingRoom}/>
      }
    </div>
  );
};

export default ChattingContainer;