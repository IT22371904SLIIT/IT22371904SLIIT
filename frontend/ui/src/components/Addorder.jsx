import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderForm = () => {
  const [form, setForm] = useState({
    CustomerName: "",
    Date: new Date().toLocaleString(),
    InvoiceNumber: generateInvoiceNumber(),
    bags: [],
    GrandTotal: 0,
    LastDiscount: 0,
    SubTotal: 0,
    BilledBy: "",
  });

  const [currentBag, setCurrentBag] = useState({
    BagCode: "",
    BagColour: "",
    BagQuantity: 0,
    BagPrice: 0,
    BagDiscount: 0,
    BagTotal: 0,
  });

  useEffect(() => {
    const bagTotal =
      currentBag.BagPrice *
      currentBag.BagQuantity *
      (1 - currentBag.BagDiscount / 100);
    setCurrentBag((prevBag) => ({
      ...prevBag,
      BagTotal: bagTotal.toFixed(2),
    }));
  }, [currentBag.BagPrice, currentBag.BagQuantity, currentBag.BagDiscount]);

  useEffect(() => {
    const grandTotal = form.bags.reduce(
      (acc, bag) => acc + parseFloat(bag.BagTotal),
      0
    );
    const subTotal = grandTotal - grandTotal * (form.LastDiscount / 100);
    setForm((prevForm) => ({
      ...prevForm,
      GrandTotal: grandTotal.toFixed(2),
      SubTotal: subTotal.toFixed(2),
    }));
  }, [form.bags, form.LastDiscount]);

  function generateInvoiceNumber() {
    const now = new Date();
    return `INV${now.getFullYear()}${("0" + (now.getMonth() + 1)).slice(
      -2
    )}${("0" + now.getDate()).slice(-2)}${now
      .toTimeString()
      .slice(0, 8)
      .replace(/:/g, "")}`;
  }

  const addBag = () => {
    const updatedBags = [...form.bags, { ...currentBag }];
    setForm((prevForm) => ({
      ...prevForm,
      bags: updatedBags,
    }));
    setCurrentBag({
      BagCode: "",
      BagColour: "",
      BagQuantity: 0,
      BagPrice: 0,
      BagDiscount: 0,
      BagTotal: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "LastDiscount") {
      const subTotal = form.GrandTotal - form.GrandTotal * (value / 100);
      setForm((prevForm) => ({
        ...prevForm,
        SubTotal: subTotal.toFixed(2),
      }));
    }
  };

  const handleBagChange = (e) => {
    const { name, value } = e.target;
    setCurrentBag((prevBag) => ({
      ...prevBag,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/orders", form);
      alert("Order created successfully!");
      setForm({
        CustomerName: "",
        Date: new Date().toLocaleString(),
        InvoiceNumber: generateInvoiceNumber(),
        bags: [],
        GrandTotal: 0,
        LastDiscount: 0,
        SubTotal: 0,
        BilledBy: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create order.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 rounded-xl shadow-lg"
    >
      <h2 className="text-4xl font-extrabold text-white text-center mb-8">Create Order</h2>

      {/* Customer Info */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-white font-semibold">Customer Name</label>
          <input
            type="text"
            name="CustomerName"
            value={form.CustomerName}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 rounded-lg border focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold">Billed By</label>
          <input
            type="text"
            name="BilledBy"
            value={form.BilledBy}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 rounded-lg border focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Date and Invoice Number */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-white font-semibold">Date</label>
          <input
            type="text"
            name="Date"
            value={form.Date}
            readOnly
            className="w-full mt-2 p-3 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold">Invoice Number</label>
          <input
            type="text"
            name="InvoiceNumber"
            value={form.InvoiceNumber}
            readOnly
            className="w-full mt-2 p-3 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>
      </div>

      {/* Bag Details */}
      <h3 className="text-3xl font-bold text-white mb-6">Bag Details</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold">Bag Code</label>
          <input
            type="text"
            name="BagCode"
            value={currentBag.BagCode}
            onChange={handleBagChange}
            className="w-full mt-2 p-3 rounded-lg border focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold">Bag Colour</label>
          <input
            type="text"
            name="BagColour"
            value={currentBag.BagColour}
            onChange={handleBagChange}
            className="w-full mt-2 p-3 rounded-lg border focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold">Bag Quantity</label>
          <input
            type="number"
            name="BagQuantity"
            value={currentBag.BagQuantity}
            onChange={handleBagChange}
            className="w-full mt-2 p-3 rounded-lg border focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold">Bag Price</label>
          <input
            type="number"
            name="BagPrice"
            value={currentBag.BagPrice}
            onChange={handleBagChange}
            className="w-full mt-2 p-3 rounded-lg border focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold">Bag Discount</label>
          <input
            type="number"
            name="BagDiscount"
            value={currentBag.BagDiscount}
            onChange={handleBagChange}
            className="w-full mt-2 p-3 rounded-lg border focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold">Total</label>
          <input
            type="text"
            value={currentBag.BagTotal}
            readOnly
            className="w-full mt-2 p-3 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={addBag}
        className="block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
      >
        Add Bag
      </button>

      {/* Grand Total */}
      <div className="mt-10 grid grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold">Last Discount</label>
          <input
            type="number"
            name="LastDiscount"
            value={form.LastDiscount}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 rounded-lg border focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold">SubTotal</label>
          <input
            type="text"
            value={form.SubTotal}
            readOnly
            className="w-full mt-2 p-3 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="block w-full mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-xl rounded-lg hover:bg-gradient-to-l shadow-lg"
      >
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;