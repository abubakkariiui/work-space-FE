import React from 'react';
import '../App.css';
import Logo from '../workspace-logo.png';

function Home() {
    return (
        <div className='Home-Div'>
            <img src={Logo} alt="logo" className='title-logo' />
            <h2 className='e-list'>All-in-one hub for managing employees and tasks</h2>
        </div>
    )
}

export default Home;