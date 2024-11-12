import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios to make HTTP requests

const OrderTable = () => {
    const [rows, setRows] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [billingTime, setBillingTime] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [grandTotal, setGrandTotal] = useState(0);
    const [localDiscount, setLocalDiscount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [billedBy, setBilledBy] = useState('');

    useEffect(() => {
        const now = new Date();
        const billingTimeString = now.toLocaleString();
        const invoiceNumberString = `${now.getFullYear().toString().slice(2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;

        setBillingTime(billingTimeString);
        setInvoiceNumber(invoiceNumberString);
    }, []);

    const addRow = () => {
        setRows([...rows, { ODescription: '', OColour: '', OQuantity: 0, OPrice: 0, ODiscount: 0, OTotal: 0.00 }]);
    };

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;

        if (field === 'OQuantity' || field === 'OPrice' || field === 'ODiscount') {
            const quantity = newRows[index].OQuantity;
            const price = newRows[index].OPrice;
            const discount = newRows[index].ODiscount;

            const discountMultiplier = (100 - discount) / 100;
            newRows[index].OTotal = parseFloat((quantity * price * discountMultiplier).toFixed(2));
        }

        setRows(newRows);
        updateGrandTotal(newRows);
    };

    const updateGrandTotal = (updatedRows) => {
        const total = updatedRows.reduce((sum, row) => sum + row.OTotal, 0);
        setGrandTotal(parseFloat(total.toFixed(2)));  // Round to 2 decimal places
        setSubtotal(parseFloat((total * ((100 - localDiscount) / 100)).toFixed(2))); // Calculate subtotal with local discount
    };

    const handleLocalDiscountChange = (e) => {
        const discount = parseFloat(e.target.value) || 0;
        setLocalDiscount(discount);
        setSubtotal(parseFloat((grandTotal * ((100 - discount) / 100)).toFixed(2)));
    };

    const finish = () => {
        addOrder(); // Call the addOrder function to save the order when "Finish Order" is clicked
        alert(`Order finished! Grand Total: ${grandTotal.toFixed(2)}, Subtotal after Discount: ${subtotal.toFixed(2)}`);
    };

    // Function to add order to the database
    const addOrder = async () => {
        const orderData = {
            Cname: customerName,
            Invoice: invoiceNumber,
            GTotal: grandTotal,
            Ldiscount: localDiscount,
            STotal: subtotal,
            Billedby: billedBy,
            Total: grandTotal,  // This can be changed if needed based on other calculations
            items: rows // Include the items in the order
        };

        try {
            const response = await axios.post('/api/orders', orderData);  // Assuming the backend endpoint is '/api/orders'
            alert('Order added successfully!');
        } catch (error) {
            alert('Failed to add order');
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            {/* Existing form and table components */}
            {/* Include a button to add the order to the backend */}
            <div className="flex justify-between mt-4">
                <div className="w-1/2">
                    <label htmlFor="billedBy" className="block text-sm font-medium text-gray-700">Billed by:</label>
                    <input
                        type="text"
                        id="billedBy"
                        value={billedBy}
                        onChange={(e) => setBilledBy(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex gap-4 justify-end items-end">
                    <button
                        type="button"
                        onClick={addRow}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Row
                    </button>
                    <button
                        type="button"
                        onClick={finish}  // Finish order button now triggers both finishing the order and adding it to the backend
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Finish Order
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="localDiscount" className="block text-sm font-medium text-gray-700">Local Discount (%)</label>
                <input
                    type="number"
                    id="localDiscount"
                    value={localDiscount}
                    onChange={handleLocalDiscountChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mt-4">
                <p><strong>Grand Total: </strong>{grandTotal.toFixed(2)}</p>
                <p><strong>Subtotal after Discount: </strong>{subtotal.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderTable;
