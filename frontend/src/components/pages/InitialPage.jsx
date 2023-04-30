import React from "react";
import { BrowserRouter } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "../pages/InitialPage.css";

import Logo from "../template/Logo";
import Nav from "../template/Nav";
import MyRoutes from "../../main/MyRoutes";
import Footer from "../template/Footer";


export default props =>
    <div className="app">
        
            <Logo />
            <Nav />
            <MyRoutes />
            <Footer />
        
    </div>