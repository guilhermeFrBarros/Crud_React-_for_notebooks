import './MainComp.css';
import React from 'react';
import Header from './Header';

export default props => 
    <React.Fragment>
        <Header {...props} />
        <main className="content container-fluid">   {/* container-fluid: deixa fluido o os elementos dentro da tag main */}
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>