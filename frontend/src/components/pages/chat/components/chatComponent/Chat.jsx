import React, { useRef, useState, useContext, useEffect } from "react";
import { SocketContext } from "../../../../../context/SocketContext";
import "../chatComponent/Chat.css";

export default function Chat(props) {
    const messageRef = useRef();
    const [messageList, setMessageList] = useState([]);
    const { socketChat } = useContext(SocketContext);

    useEffect(() => {
        if (socketChat) {
            console.log(socketChat);
            socketChat.on("receive_message", (data) => {
                setMessageList((prevState) => [...prevState, data]);
            });

            return () => socketChat.off("receive_message");
        }
    }, [socketChat]);

    function handleKeyPress(e) {
        const message = messageRef.current.value;
        if (e.key === "Enter" && message.trim()) {
            handleSubmit();
        } else if (e.key === "Enter") {
            messageRef.current.placeholder = "Digite algo antes de enviar...";
        }
    }

    const handleSubmit = () => {
        console.log("CHAMOU");
        const message = messageRef.current.value;
        if (!message.trim()) {
            messageRef.current.placeholder = "Digite algo antes de enviar...";
            return;
        }

        socketChat.emit("message", message);
        clearInput();
    };

    const clearInput = () => {
        messageRef.current.value = "";
        messageRef.current.placeholder = "Mensagem";
    };

    return (
        <div className="chatComponent">
            <h1>Chat</h1>
            <div className="templadeChat">
                {messageList.map((message, index) => (
                    <div key={index} className="mensagem-chat">
                        <p>{message.author}:</p>
                        <p>- {message.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                className="chat-input"
                ref={messageRef}
                onKeyUp={handleKeyPress}
                placeholder="Mensagem"
            />
            <button className="button" onClick={() => handleSubmit()}>
                <strong>Enviar</strong>
            </button>
        </div>
    );
}
