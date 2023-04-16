import './Nav.css';
import React from 'react';
import {Link} from 'react-router-dom';

export default props =>
    <aside className="menu-area">
        {/*Refatorar */}
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home" ></i> Início
            </Link>
            <Link to="/notebooks">
                <i className="fa fa-laptop" aria-hidden="true"></i> Notebooks
            </Link>
        </nav>
    </aside>
