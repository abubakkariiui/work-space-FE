import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import Logo from '../workspace-logo-2.png';

function Nav() {

    return (
        <nav>
            <Link to='/'>
                <img src={Logo} alt="logo" className='nav-logo' />
            </Link>
            <ul className="nav-links">

                <Link to='/employees' className='nav-link'>
                    <li>Employees</li>
                </Link>

                <Link to='/tasks' className='nav-link'>
                    <li>Tasks</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;