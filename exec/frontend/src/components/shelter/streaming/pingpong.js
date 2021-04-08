const sendMessage = (ws, message, setting) => {
  if (ws.extensions === null) clearInterval(setting);

  var jsonMessage = JSON.stringify(message);
  // console.log('Sending message: ' + jsonMessage);
  ws.send(jsonMessage);
  console.log("I send pingpong! give me a pingpong");
};

const Pingpong = (ws) => {
  var message = {
    id: "pingpong",
  };

  const setting = setInterval(() => {
    sendMessage(ws, message, setting);
  }, 40000);
};

export default Pingpong;
