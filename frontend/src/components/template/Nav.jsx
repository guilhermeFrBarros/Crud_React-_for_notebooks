import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
import iconParty from "../../assets/icons/party2.png"

export default props => {


    const sair = () => {
        localStorage.clear();
        location.reload();
    }

    return (

        <aside className="menu-area">
            {/*Refatorar */}
            <nav className="menu">
                <Link to="/home">
                    <i className="fa fa-home" ></i> Início
                </Link>
                <Link to="/festas" id="festa">
                    <img src={iconParty} alt="icone festa" /> Festas
                </Link>
                <div onClick={sair} className="menu">
                    <i className="fa fa-sign-out" ></i> Sair
                </div>
            </nav>
        </aside>
    );
}
