import './Nav.css';
import React from 'react';
import {Link} from 'react-router-dom';

export default props =>
    <aside className="menu-area">
        {/*Refatorar */}
        <nav className="menu">
            <Link to="/home">
                <i class="fa fa-home" ></i> Início
            </Link>
            <Link to="/festas">
                <i className="fa fa-laptop" aria-hidden="true"></i> Festas
            </Link>
        </nav>
    </aside>
