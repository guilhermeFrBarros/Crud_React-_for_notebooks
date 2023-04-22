//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitialPage from '../components/pages/InitialPage';
import Login from '../components/pages/Login';
import PartyCrud from '../components/notebook/PartyCrud';

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import Footer from '../components/template/Footer';
import Home from '../components/home/Home';
import MyRoutes from './MyRoutes';

export default props => {


   //const [logado, setIsLogado] = useState(false);

   return (
      <>
         <BrowserRouter>
            <InitialPage />
         </BrowserRouter>
         {/* <BrowserRouter>
            {logado && <div className="app">
               <Logo />
               <Nav />
               <MyRoutes />
               <Footer />
            </div>
            }
            <Routes>
               <Route exact path="/login" element={<Login />} />
               <Route path="/initial" element={<InitialPage />} />
               <Route path="/notebooks" element={<PartyCrud />} />
            </Routes>
         </BrowserRouter> */}
      </>
   )
}


