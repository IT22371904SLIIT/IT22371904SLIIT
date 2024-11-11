import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-black text-white flex flex-col items-start p-6">
      <h2 className="text-3xl font-bold mb-8">Menu</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/dashboard"
          className="w-full text-left px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Dashboard
        </Link>

        <Link
          to="/add-new-bag"
          className="w-full text-left px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Add New Bag
        </Link>

        <Link
          to="/bags-list"
          className="w-full text-left px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Bags List
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
