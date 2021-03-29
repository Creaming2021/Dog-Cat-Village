import React, { useEffect } from 'react';
import Broadcast from './broadcast';


let broadcast = new Broadcast();

const Live = () => {

  useEffect(() => {
    broadcast.createSocketClient();
    broadcast.setVideo(document.getElementById("video"));
    broadcast.createSocketEvent();

    return () => {
      broadcast.$ws.disconnet();
      broadcast.stop();
    }

  }, []);

  return(
    <>
      <video id="video" autoPlay width="600px" height="400px" ></video>
    </>
  );
}

export default Live;