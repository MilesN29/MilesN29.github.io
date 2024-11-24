import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="top_nav_bar">
      <div className="nav_links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <a href="https://github.com/MilesN29" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/miles-newland-34518a262/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
};

export default Navbar;