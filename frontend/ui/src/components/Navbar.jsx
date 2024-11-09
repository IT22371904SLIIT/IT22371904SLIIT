import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4 shadow-lg mt-2 mb-2"> {/* Added mb-2 for small gap */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <div className="text-2xl font-bold cursor-pointer hover:text-orange-500 transition">
          Dmax Lanka PVT LTD
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:bg-orange-500 hover:text-white rounded-full px-3 py-1 transition">
            Home
          </a>
          <a href="#create-order" className="hover:bg-orange-500 hover:text-white rounded-full px-3 py-1 transition">
            Create Order
          </a>
          <a href="#orders-list" className="hover:bg-orange-500 hover:text-white rounded-full px-3 py-1 transition">
            Orders List
          </a>
          <a href="#contact" className="hover:bg-orange-500 hover:text-white rounded-full px-3 py-1 transition">
            Contact
          </a>
        </div>

        {/* Log In Button */}
        <div className="hidden md:block">
          <button className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition">
            Log In
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
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
