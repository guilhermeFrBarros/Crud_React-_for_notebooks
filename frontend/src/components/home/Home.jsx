import Main from "../template/MainComp";
import { useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

import React from "react";

export default (props) => {
  const { socketChat } = useContext(SocketContext);

  useEffect(() => {
    if (socketChat) {
      socketChat.disconnect();
    }
  }, []);

  return (
    <Main
      icon="home"
      title="Início" /* o icon home veio do font-awonso*/
      subtitle="Party of Legends"
    >
      <div className="display-4">Bem Vindo!</div>
      <hr />
      <p className="mb-0">Um sistema para gerenciamento de festas!</p>
    </Main>
  );
};
