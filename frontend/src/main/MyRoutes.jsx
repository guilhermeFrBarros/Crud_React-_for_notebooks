import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import PartyCrud from "../components/party/PartyCrud";
import Login from "../components/pages/Login";
import InitialPage from "../components/pages/InitialPage";

export default props => (
    <>
        <Routes>
            <Route path="/home" element={<Home />} />           {/*{exact} essa propriedade chamada exact serve, para so navegar, para o home quando o path for apenas barra*/}
            <Route path="/festas" element={<PartyCrud />} />
            {/* <Route path="*" element={<Home />} /> */}
        </Routes>
    </>






)