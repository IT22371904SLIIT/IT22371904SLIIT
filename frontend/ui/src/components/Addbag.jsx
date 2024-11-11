import React, { useState } from 'react';
import axios from 'axios';

const AddBagForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    colour: '',
    quantity: '',
    price: ''
  });
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(''); // To manage error messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      // Send POST request to the backend to add a new bag
      const response = await axios.post('http://localhost:4400/api/stocks', formData);
      console.log('Bag added successfully:', response.data);

      // Clear the form after successful submission
      setFormData({
        code: '',
        colour: '',
        quantity: '',
        price: ''
      });

      // Optionally, show a success message
      alert('Bag added successfully!');
    } catch (error) {
      console.error('Error adding the bag:', error);
      setError('Failed to add the bag. Please try again.');
    } finally {
      setLoading(false); // End the loading state
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Bag</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding...' : 'Add to Stock'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBagForm;
