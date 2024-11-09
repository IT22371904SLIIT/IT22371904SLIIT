import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-darkblue text-red px-8 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <div className="text-2xl font-bold cursor-pointer hover:text-white transition">
          Dmax Lanka PVT LTD
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:bg-white hover:text-darkblue rounded-full px-3 py-1 transition">
            Home
          </a>
          <a href="#create-order" className="hover:bg-white hover:text-darkblue rounded-full px-3 py-1 transition">
            Create Order
          </a>
          <a href="#orders-list" className="hover:bg-white hover:text-darkblue rounded-full px-3 py-1 transition">
            Orders List
          </a>
          <a href="#contact" className="hover:bg-white hover:text-darkblue rounded-full px-3 py-1 transition">
            Contact
          </a>
        </div>

        {/* Button */}
        <div className="hidden md:block">
          <button className="bg-darkblue px-4 py-2 rounded-full hover:bg-white hover:text-darkblue transition">
            Log In
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-red focus:outline-none focus:ring-2 focus:ring-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
