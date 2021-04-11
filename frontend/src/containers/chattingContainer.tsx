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
  const [ message, setMessage]  = useState('');

  const onChange = (e:any) => {
    const value = e.target.value;
    setMessage(value);
  }

  const member = useSelector((state: RootState) => state.member.memberInfo);
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);
  const dispatch = useDispatch();

  let connected;

  useEffect(() => {
    connect();
    getChatDetail("33585559-cdad-4a3f-af44-063b24277a17", 2);

    // 채팅 시작하기
    if( member.data && selectedShelterId ) {
      dispatch(ChatAction.createChatAsync.request(
        { myId: member.data?.memberId, oppId: selectedShelterId }));
    }
  }, []);

  let stompClient:any = null;

  const connect = () => {

    const serverUrl = 'https://j4b106.p.ssafy.io/api/ws';
    let socket = new Sockjs(serverUrl);
    console.log('sockjs가 준 socket', socket);

    if(stompClient != null){
      stompClient.disconnect();
      stompClient = Stomp.over(socket);
    } else {
      stompClient = Stomp.over(socket);
    }
    console.log('소켓 연결 시도 stompClient', stompClient);

    stompClient.connect({}, (frame:any) => {
        connected = true;
        console.log('소켓 연결 성공', frame);

        // 서버 메시지 end point 구독
        // /message/${roomId}/${myId}
        stompClient.subscribe('/message/33585559-cdad-4a3f-af44-063b24277a17', (res: any) => {
          console.log('구독으로 받은 메시지들이 body에 담겨온다. ', res.body);
          
        })

    }, (error:any) => {
      console.log('소켓 연결 실패');
      connected = false; 
    });
    
  }



  const onSubmitSendMessage = () => {

    // 한국 시간 변경
    const curr = new Date();
    const utc = curr.getTime();
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    const message = {
      roomId: "33585559-cdad-4a3f-af44-063b24277a17",
      myId: 3,
      oppId: 2,
      msg: " 롸 ? 😮 ? ",
      date: kr_curr,
      oppName: "OK"
    };


    console.log('메시지 전송!')
    stompClient.send('/app/receive', {}, JSON.stringify(message));

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

  return (
    // <div className={styles['chatting-container']}>
    //   { listSet &&
    //     <ChatList 
    //       chatList={chatList.data || []}
    //       onClick={onClickChattingRoom}/>
    //   }      
     <ChatRoom
        selectedChat={selectedChat.data}
        onSubmitSendMessage={onSubmitSendMessage}
        message={message}
        onChange={onChange}/>
      
    // <div className="App">
    //   <p>난 슬플때,, 채팅을 해</p>
    //   <button onClick={() => onSubmitSendMessage()}>메시지 전송</button>
    // </div>
  );
};

export default ChattingContainer;