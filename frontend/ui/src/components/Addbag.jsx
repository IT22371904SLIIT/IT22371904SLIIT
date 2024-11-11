import React, { useState } from 'react';
import axios from 'axios';

const AddBagForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    colour: '',
    quantity: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to the backend to add a new bag
    axios.post('/api/stocks', formData)
      .then(response => {
        console.log('Bag added successfully:', response.data);
        
        // Clear the form after successful submission
        setFormData({
          code: '',
          colour: '',
          quantity: '',
          price: ''
        });
      })
      .catch(error => {
        console.error('There was an error adding the bag!', error);
        alert("Failed to add the bag. Please try again.");
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Bag</h1>
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
            Code
          </label>
          <input
            type="text"
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colour">
            Colour
          </label>
          <input
            type="text"
            name="colour"
            id="colour"
            value={formData.colour}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add to Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBagForm;
