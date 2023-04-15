import './Nav.css';
import React from 'react';

export default props =>
    <aside className="menu-area">
        {/*Refatorar */}
        <nav className="menu">
            <a href="/">
                <i className="fa fa-home" ></i> Início
            </a>
            <a href="/notebooks">
                <i className="fa fa-laptop" aria-hidden="true"></i> Notebooks
            </a>
        </nav>
    </aside>
