import React, { useState, useEffect } from 'react';

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

            // Calculate total with discount as a percentage and format to 2 decimal places
            const discountMultiplier = (100 - discount) / 100;
            newRows[index].OTotal = parseFloat((quantity * price * discountMultiplier).toFixed(2));
        }

        setRows(newRows);
        updateGrandTotal(newRows);
    };

    const updateGrandTotal = (updatedRows) => {
        const total = updatedRows.reduce((sum, row) => sum + row.OTotal, 0);
        setGrandTotal(parseFloat(total.toFixed(2)));  // Round to 2 decimal places
        setSubtotal(parseFloat((total * ((100 - localDiscount) / 100)).toFixed(2))); // Calculate subtotal with local discount, rounded to 2 decimal places
    };

    const handleLocalDiscountChange = (e) => {
        const discount = parseFloat(e.target.value) || 0;
        setLocalDiscount(discount);
        setSubtotal(parseFloat((grandTotal * ((100 - discount) / 100)).toFixed(2)));
    };

    const finish = () => {
        alert(`Order finished! Grand Total: ${grandTotal.toFixed(2)}, Subtotal after Discount: ${subtotal.toFixed(2)}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Order Entry</h2>
            <div className="mb-4">
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name:</label>
                <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="billingTime" className="block text-sm font-medium text-gray-700">Billing Time:</label>
                <span id="billingTime" className="block mt-1 text-gray-900">{billingTime}</span>
            </div>
            <div className="mb-4">
                <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Invoice Number:</label>
                <span id="invoiceNumber" className="block mt-1 text-gray-900">{invoiceNumber}</span>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colour</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="text"
                                    value={row.ODescription}
                                    onChange={(e) => handleInputChange(index, 'ODescription', e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="text"
                                    value={row.OColour}
                                    onChange={(e) => handleInputChange(index, 'OColour', e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="number"
                                    value={row.OQuantity}
                                    onChange={(e) => handleInputChange(index, 'OQuantity', parseInt(e.target.value))}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="number"
                                    value={row.OPrice}
                                    onChange={(e) => handleInputChange(index, 'OPrice', parseFloat(e.target.value))}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="number"
                                    value={row.ODiscount}
                                    onChange={(e) => handleInputChange(index, 'ODiscount', parseFloat(e.target.value))}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="number"
                                    value={row.OTotal.toFixed(2)}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                        onClick={finish}
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
