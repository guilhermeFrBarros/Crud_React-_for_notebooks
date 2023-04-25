//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useContext } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitialPage from '../components/pages/InitialPage';
import Login from '../components/pages/Login';


import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import Footer from '../components/template/Footer';

import MyRoutes from './MyRoutes';

import { LoginContext } from '../context/LoginContext';

export default props => {

   const { isLogado, setIsLogado } = useContext(LoginContext);
   //localStorage.clear();
   const token = localStorage.getItem('token');
   console.log(token)

   return (
      <>
         {/* <BrowserRouter>
            <InitialPage />
         </BrowserRouter> */}
         <BrowserRouter>
            {token && <div className="app">
               <Logo />
               <Nav />
               <MyRoutes />
               <Footer />
            </div>
            }
            <Routes>
               <Route path="/" element={!token && <Login />} />
               <Route path="/initial" element={<InitialPage />} />
               <Route path="*" element={<Login />} />
               {/* <Route path="/notebooks" element={<PartyCrud />} /> */}
            </Routes>
         </BrowserRouter>
      </>
   )
}


