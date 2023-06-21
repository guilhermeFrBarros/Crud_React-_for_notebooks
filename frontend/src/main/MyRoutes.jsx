import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import PartyCrud from "../components/party/PartyCrud";
import ChatPage from "../components/pages/chat/ChatPage";

import { SocketProvider } from "../context/SocketContext";

export default (props) => {


  return (
    <>
      <SocketProvider>
        <Routes>
          <Route path="/home" element={<Home />} />{" "}
          {/*{exact} essa propriedade chamada exact serve, para so navegar, para o home quando o path for apenas barra*/}
          <Route path="/festas" element={<PartyCrud />} />
          <Route path="/chat-page" element={<ChatPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </SocketProvider>
    </>
  );
};
