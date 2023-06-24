import React, { useRef, useState, useContext, useEffect } from "react";
import { SocketContext } from "../../../../../context/SocketContext";

export default function Chat(props) {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const { socketChat } = useContext(SocketContext);

  useEffect(() => {
    if(socketChat) {
        console.log(socketChat)
        socketChat.on("receive_message", (data) => {
          setMessageList((prevState) => [...prevState, data]);
        });
    
        return () => socketChat.off("receive_message");

    }
  }, [socketChat]);

    const handleSubmit = () => {
        console.log("CHAMOU")
      const message = messageRef.current.value;
      if (!message.trim()) return;

      socketChat.emit("message", message);
      clearInput();
    };

    const clearInput = () => {
      messageRef.current.value = "";
    };

  return (
    <div>
      <h1>Chat</h1>
      {messageList.map((message, index) => (
        <p key={index}>
          {message.author}: {message.text}
        </p>
      ))}
      <input
        type="text"
        ref={messageRef}
        placeholder="Mensagem"
        
      />
      <button onClick={() => handleSubmit()}>Eniviar</button>
    </div>
  );
}
