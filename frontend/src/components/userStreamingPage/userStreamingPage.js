import React, { useEffect, useRef } from 'react';
import styles from './userStreamingPage.module.css';
import Nav from '../nav/nav';
import { ImageSmall } from '../common/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBone, faPaw, faFish } from '@fortawesome/free-solid-svg-icons';
import kurentoUtils from 'kurento-utils';

const UserStreamingPage = () => {

  var ws = new WebSocket("ws://j4b106.p.ssafy.io:8443/live");
  var webRtcPeer;
  var video;

  window.onload = function() {
    
    video = document.getElementById('video');
    viewer();
    // presenter();

    // disableStopButton();
  }

  window.onbeforeunload = function() {
    ws.close();
  }

  ws.onmessage = function(message) {
    var parsedMessage = JSON.parse(message.data);
    console.info('Received message: ' + message.data);

    switch (parsedMessage.id) {
    case 'presenterResponse':
      presenterResponse(parsedMessage);
      break;
    case 'viewerResponse':
      viewerResponse(parsedMessage);
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

  function viewerResponse(message) {
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
      id : 'presenter',
      sdpOffer : offerSdp
    }
    sendMessage(message);
  }

  function viewer() {
    if (!webRtcPeer) {
      // showSpinner(video);

      var options = {
        remoteVideo : video,
        onicecandidate : onIceCandidate
      }

      webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
          function(error) {
            if (error) {
              return console.error(error);
            }
            this.generateOffer(onOfferViewer);
          });

      // enableStopButton();
    }
  }

  function onOfferViewer(error, offerSdp) {
    if (error)
      return console.error('Error generating the offer');
    // console.info('Invoking SDP offer callback function ' + location.host);
    var message = {
      id : 'viewer',
      sdpOffer : offerSdp
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


  function dispose() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }
    // hideSpinner(video);

    // disableStopButton();
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    // console.log('Sending message: ' + jsonMessage);
    ws.send(jsonMessage);
  }

  return(
    <div className={styles['user-streaming-container']}>
      <div className={styles['upper-container']}>
        <Nav role={'CONSUMER'} />        
      </div>
      <div className={styles['main-box']}>
        <div className={styles['streaming-container']}>
          {/*  쿠렌토화면 넣어야함  */}
          <video id="video" muted autoPlay controls height="100%" width="1300px"/>
        </div>
        <div className={styles['streaming-info-container']}>
          <div className={styles['shelter-img']}>
            <ImageSmall/>
          </div>
          <div className={styles['streaming-host-info']}>
            <div className={styles['streaming-name']}>
              댕댕이 라이브 _ 방송 후원은 사랑입니다 😍😎
            </div>
            <div className={styles['shelter-info-container']}>
              <div className={styles['shelter-name']}>
                제이 아죠씨의 동물농장
              </div>
              <div className={styles['viewer-container']}>
                <FontAwesomeIcon icon={faUserCircle} className={styles['user-icon']}/>
                <div className={styles['viewer-num']}>145</div>
              </div>
            </div>
          </div>
          <div className={styles['icons-container']}>
            <FontAwesomeIcon icon={faBone} className={styles['bone-icon']}/>
            <FontAwesomeIcon icon={faPaw} className={styles['paw-icon']} />
            <FontAwesomeIcon icon={faFish} className={styles['fish-icon']} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStreamingPage;
