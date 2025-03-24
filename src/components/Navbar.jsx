// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

import './../App.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="nav-links">
            <li>
                <Link to="/" className='link-text'>Home</Link>  
            </li>
            <li>
                <Link to="/every-tree" className='link-text'>Every Tree</Link> 
            </li>
            <li>
                <Link to="/every-commute" className='link-text'>Every Commute</Link> 
            </li>
            <li>
                <Link to="/every-gallon" className='link-text'>Every Gallon</Link> 
            </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;