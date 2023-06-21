import { createContext, useState } from "react";


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socketChat, setSocketChat] = useState();


    return (
        <SocketContext.Provider value={{ socketChat, setSocketChat}}>
            {children}
        </SocketContext.Provider>
    )
}