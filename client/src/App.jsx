import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

import "./App.css";

function App() {
  const [room, setRoom] = useState();
  const [message, setMessage] = useState();
  const [messageReceived, setMessageReceived] = useState();

  const inputChangeHandler = (event) => {
    setRoom(event.target.value);
  };

  const joinRoomHandler = () => {
    if (room) {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { room, message });
    setMessage("");
  };

  socket.on("recieve_message", (data) => {
    setMessageReceived(data.message);
  });

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Enter the room ID"
        onChange={inputChangeHandler}
      />
      <button onClick={joinRoomHandler}>Join Room</button>
      <input
        placeholder=" Type Your Message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
