import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import PartyCrud from "../components/notebook/PartyCrud";
import Login from "../components/pages/Login";
import InitialPage from "../components/pages/InitialPage";


export default props => (
    <>
        
            <Routes>
                <Route path="/home" element={<Home />} />           {/*essa propriedade chamada exact serve, para so navegar, para o home quando o path for apenas barra*/}
                <Route path="/notebooks" element={<PartyCrud />} />
                <Route path="*" element={<Home />} ></Route>
            </Routes>
       
    </>






)