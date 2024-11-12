import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import Baglist from './components/Baglist';
import AddBagForm from './components/Addbag';
import UpdateData from './components/Updatedata';
import OrderTable from './components/Addorder'; // Import OrderTable component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        
        <div className="flex flex-1 mt-0">
          {isLoggedIn && <Sidebar />}

          <div className="relative flex-1 flex justify-center items-center overflow-hidden">
            {!isLoggedIn && (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3yhDjvz4BNWkWaZJmvnWLxMRclyPkNGQiow&s)",
                    opacity: 0.75,
                  }}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-white">
                  <div className="text-4xl italic font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800 drop-shadow-xl shadow-gray-900">
                    Welcome to Sahan Dmax Lanka Pvt Ltd
                  </div>

                  <LoginPage setIsLoggedIn={setIsLoggedIn} />
                </div>
              </>
            )}

            {isLoggedIn && (
              <div className="flex-1 flex justify-center items-center">
                <Routes>
                  <Route path="/bags-list" element={<Baglist />} />
                  <Route path="/add-new-bag" element={<AddBagForm />} />
                  <Route path="/update-stock/:id" element={<UpdateData />} />
                  <Route path="/create-order" element={<OrderTable />} /> {/* Add route for OrderTable */}
                  {/* Add other routes as needed */}
                </Routes>
              </div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
