import React, { useEffect, useRef, useState } from "react";
import styles from "../home/home.module.css";
import { ButtonLarge, ImageSmall } from "../../common/common";
import { SignInResponseType } from "../../../interface/member";
import kurentoUtils from 'kurento-utils';
import pingpong from "./pingpong";

// type ReadyStreamingProps = {
// 	member: SignInResponseType | null,
// };

var ws = new WebSocket("wss://j4b106.p.ssafy.io/live");


const ReadyStreaming = ({ member, shelterId, roomName }) => {
  // const [start, setStart] = useState(false);
  // const [ws, setWs] = useState(null);

  // var ws;
  var webRtcPeer;
  var video;
  let start;

  window.onload = function() {
    ws = new WebSocket("wss://j4b106.p.ssafy.io/live");
    video = document.getElementById('video');
    console.log(ws);


    // start = true;
  }
  
  // useEffect(() => {
  //   // setWs(new WebSocket("wss://j4b106.p.ssafy.io/live"));
  //   ws = new WebSocket("wss://j4b106.p.ssafy.io/live");
  //   video = document.getElementById('video');
  //   console.log(ws);
  // }, []);
  
  window.onbeforeunload = function() {
    ws.onClose();
  }

  useEffect(() => {
    if(ws && ws.extensions){
      pingpong(ws);

      
    }
  }, [ws]);

  ws.onmessage = function(message) {
    var parsedMessage = JSON.parse(message.data);
    console.info('Received message: ' + message.data);

    switch (parsedMessage.id) {
    case 'shelterResponse':
      presenterResponse(parsedMessage);
      break;
    case 'iceCandidate':
      webRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
        if (error)
          return console.error('Error adding candidate: ' + error);
      });
      break;
    case 'stopCommunication':
      dispose();
      break;
    default:
      console.error('Unrecognized message', parsedMessage);
    }
  }

  const onClick = () => {
    // setStart(true);
		// alert(`방송 시작 처리하시면 됩니다. memberId = ${member?.memberId}`);
    
    // setWs(new WebSocket("wss://j4b106.p.ssafy.io/live"));
    
    video = document.getElementById('video');
    // viewer();
    presenter();

      // disableStopButton();

     start = true;
  };

  function presenterResponse(message) {
    if (message.response != 'accepted') {
      var errorMsg = message.message ? message.message : 'Unknow error';
      console.info('Call not accepted for the following reason: ' + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
        if (error)
          return console.error(error);
      });
    }
  }

  function presenter() {
    if (!webRtcPeer) {
      // showSpinner(video);

      var options = {
        localVideo : video,
        onicecandidate : onIceCandidate
      }

      webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
          function(error) {
            if (error) {
              return console.error(error);
            }
            webRtcPeer.generateOffer(onOfferPresenter);
          });
      // enableStopButton();
    }
  }

  function onOfferPresenter(error, offerSdp) {
    if (error)
      return console.error('Error generating the offer');
    // console.info('Invoking SDP offer callback function ' + location.host);
    var message = {
      id: 'shelter',
      sdpOffer: offerSdp,
      shelterId: shelterId, // 보호소 아이디
    }
    sendMessage(message);
  }

  function onIceCandidate(candidate) {
    // console.log("Local candidate" + JSON.stringify(candidate));

    var message = {
      id : 'onIceCandidate',
      candidate : candidate
    };
    sendMessage(message);
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    // console.log('Sending message: ' + jsonMessage);
    ws.send(jsonMessage);
  }

  function dispose() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }
    // hideSpinner(video);  
    // disableStopButton();
  }

  // 연결 해제
  const close = () => {
    console.log(ws);
    dispose();
    ws.close();
    // setStart(false);
    start = false;
  }

  return (
    <div className={styles.streaming}>
      <video id="video" muted autoPlay controls/>
      {/* { start 
      ? <ButtonLarge
        content="스트리밍 중지하기"
        onClick={close}
        buttonColor="bg-white-green"
      />
      : <ButtonLarge
          content="스트리밍 시작하기"
          onClick={onClick}
          buttonColor="bg-white-green"
        />
      } */}
      <ButtonLarge
          content="스트리밍 시작하기"
          onClick={onClick}
          buttonColor="bg-white-green" /> 
      <ButtonLarge
        content="스트리밍 중지하기"
        onClick={close}
        buttonColor="bg-white-green" />
      
    </div>
  );
};

export default ReadyStreaming;
