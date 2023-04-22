import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {

    const [isLogado, setIsLogado] = useState();

    

    return (
        <LoginContext.Provider value={{ isLogado, setIsLogado }}>
            {children}
        </LoginContext.Provider>
        
    );
};
