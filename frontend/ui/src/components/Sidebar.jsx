import React from 'react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col items-start p-6 mt-2"> {/* Text set to white */}
      <h2 className="text-3xl font-bold mb-8">Menu</h2>
      <nav className="flex flex-col space-y-4">
        {/* Dashboard Link */}
        <a
          href="#dashboard"
          className="w-full text-left px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Dashboard
        </a>
        
        {/* Add New Bag Link */}
        <a
          href="#add-new-bag"
          className="w-full text-left px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Add New Bag
        </a>

        {/* Bags List Link */}
        <a
          href="#bags-list"
          className="w-full text-left px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Bags List
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
