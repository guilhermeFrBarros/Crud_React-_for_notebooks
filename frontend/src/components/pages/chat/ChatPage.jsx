import React from "react";
import { useEffect } from "react";
import "./ChatPage.css";
import io from "socket.io-client";
import { useContext } from "react";

import { SocketContext } from "../../../context/SocketContext";

import Main from "../../template/MainComp";
import Chat from "./components/chatComponent/Chat";
import Label from "./components/join/Label";

export default () => {
  let emailDoUsuario = localStorage.getItem("email");
  console.log(emailDoUsuario);

  const { SocketChat, setSocketChat} = useContext(SocketContext);

  const conectSocket = async () => {
    const socket = await io.connect("http://localhost:3008");
    socket.emit("set_emailUser", emailDoUsuario);
  };

  useEffect(() => {
    conectSocket();
  }, []);

  return (
    <Main
      icon="commenting-o"
      title="Chat" /* o icon home veio do font-awonso*/
      subtitle="Forum para Discuções sobre Festas."
    >
      <div className="chatPage">
        <Label email={emailDoUsuario} />
        <Chat />
      </div>
    </Main>
  );
};
