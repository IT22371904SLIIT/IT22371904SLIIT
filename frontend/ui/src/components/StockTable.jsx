import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get('/api/stocks')
      .then(response => {
        console.log(response.data); // Check the response structure
        setStocks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the stocks!", error);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Stock Inventory</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Code</th>
              <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Colour</th>
              <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
              <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(stocks) && stocks.length > 0 ? (
              stocks.map((stock, index) => (
                <tr key={stock._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="py-4 px-6 text-gray-700">{stock.code}</td>
                  <td className="py-4 px-6 text-gray-700">{stock.colour}</td>
                  <td className="py-4 px-6 text-gray-700">{stock.quantity}</td>
                  <td className="py-4 px-6 text-gray-700">${stock.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-700">Bags not available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
