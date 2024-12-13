import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowOrder = () => {
  const { invoiceNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/orders/${invoiceNumber}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the order!", error);
        setError("There was an error fetching the data.");
      });
  }, [invoiceNumber]);

  const handleUpdate = () => {
    navigate(`/update-order/${invoiceNumber}`);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:4000/api/orders/${invoiceNumber}`)
      .then(() => {
        alert('Order deleted successfully');
        navigate('/orders-list');
      })
      .catch(error => {
        console.error("There was an error deleting the order!", error);
        alert('Error deleting order');
      });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Invoice Number: {order.InvoiceNumber}</h2>
            <h3 className="text-xl text-gray-600">Customer Name: {order.CustomerName}</h3>
          </div>
          <div>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Bag Code</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Bag Quantity</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Bag Price</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Bag Discount</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Bag Total</th>
              </tr>
            </thead>
            <tbody>
              {order.Bags.map((bag, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="py-4 px-6 text-gray-700">{bag.BagCode}</td>
                  <td className="py-4 px-6 text-gray-700">{bag.BagQuantity}</td>
                  <td className="py-4 px-6 text-gray-700">{bag.BagPrice}</td>
                  <td className="py-4 px-6 text-gray-700">{bag.BagDiscount}</td>
                  <td className="py-4 px-6 text-gray-700">{bag.BagTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-bold text-gray-800">Discount: {order.LastDiscount}</h4>
          <h4 className="text-lg font-bold text-gray-800">Subtotal: {order.SubTotal}</h4>
        </div>
      </div>
    </div>
  );
};

export default ShowOrder;