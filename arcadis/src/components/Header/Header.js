import React from 'react'

import './style.css';

function Header({ header }) {
    return (
        <div className='header-container'>
            <h1>{header}</h1>
        </div>
    )
}

export default Header;
