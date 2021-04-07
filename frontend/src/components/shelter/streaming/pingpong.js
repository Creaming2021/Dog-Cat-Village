
const sendMessage = (ws, message) => {
	var jsonMessage = JSON.stringify(message);
	// console.log('Sending message: ' + jsonMessage);
	ws.send(jsonMessage);
	console.log("I send pingpong! give me a pingpong");
}

const Pingpong = (ws) => {
  var message = {
    id: "pingpong",
  };

	setInterval(() => {sendMessage(ws, message)}, 40000);
};

export default Pingpong;