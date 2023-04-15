import React from "react";
import {Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import NotebookCrud from "../components/notebook/NotebookCrud";


export default props => (
    <Routes>
        <Route exact path="/" element={<Home />}/>           {/* essa propriedade chamada exact serve, para so navegar, para o home quando o path for apenas barra  */}
        <Route path="/notebooks" element={<NotebookCrud />} />
        <Route path="*" element= {<Home />} />
    </Routes>
)