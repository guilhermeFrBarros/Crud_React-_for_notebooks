import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

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
                <Link to="/festas">
                    <i className="fa fa-laptop" aria-hidden="true"></i> Festas
                </Link>
                <Link>
                    <div onClick={sair}>
                        <i className="fa fa-sign-out" ></i> Sair
                    </div>
                </Link>

            </nav>
        </aside>
    );
}
