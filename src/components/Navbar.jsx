import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <a href="/" className="text-white text-xl font-bold">Brand</a>
        <button className="text-white block lg:hidden" onClick={toggleMenu}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">Home</Link>
        <Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">Register</Link>
        <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">Login</Link>
        <Link to="/add-listings" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400">Add Listings</Link>
      </div>
    </nav>
  );
};

export default Navbar;
