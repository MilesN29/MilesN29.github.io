import React from 'react';
//import './Navbar.css';

const Navbar = () => {
    return (
        <div className="top_nav_bar">
            <div className="nav_links">
                <a href="/">Home</a>
                <a href="/contact">Contact</a>
                <a href="https://github.com/MilesN29" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/miles-newland-34518a262/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </div>
    );
};

export default Navbar;
