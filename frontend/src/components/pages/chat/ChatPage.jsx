import React from "react";
import { useEffect } from "react";
import "./ChatPage.css";
import io, { Socket } from "socket.io-client";
import { useContext } from "react";

import { SocketContext } from "../../../context/SocketContext";

import Main from "../../template/MainComp";
import Chat from "./components/chatComponent/Chat";
import Label from "./components/label/Label";

export default () => {
    let emailDoUsuario = localStorage.getItem("email");
    console.log(emailDoUsuario);

    const { socketChat, setSocketChat } = useContext(SocketContext);
    let socket;
    const conectSocket = async () => {
        socket = await io.connect("https://localhost:3001", {
            auth: {
                token: localStorage.getItem("token"),
            },
        });
        socket.emit("set_emailUser", emailDoUsuario);
        console.log("chatPage: " + socket);
        setSocketChat(socket);
    };

    useEffect(() => {
        conectSocket();
    }, []);

    return (
        <Main
            icon="commenting-o"
            title="Chat" /* o icon home veio do font-awonso*/
            subtitle="Fórum para Discuções sobre Festas."
        >
            <div className="chatPage">
                <Label email={emailDoUsuario} />
                <Chat />
            </div>
        </Main>
    );
};
