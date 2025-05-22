import React, { useState, useEffect, useContext } from 'react';
import MenuBar from './MenuBar';
import { AuthContext } from '../App';

const StockOut = () => {
  const { token } = useContext(AuthContext);
  const [stockOuts, setStockOuts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    StockOutUnitPrice: '',
    StockOutQuality: '',
    StockOutTotalPrice: '',
    StockOutDate: '',
  });
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchStockOuts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stockout', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await response.json();
      setStockOuts(data);
    } catch (err) {
      console.error('Error fetching stock outs:', err);
    }
  };

  useEffect(() => {
    fetchStockOuts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditPopup = (stock) => {
    setFormData({
      StockOutUnitPrice: stock.StockOutUnitPrice,
      StockOutQuality: stock.StockOutQuality,
      StockOutTotalPrice: stock.StockOutTotalPrice,
      StockOutDate: stock.StockOutDate,
    });
    setEditId(stock.id);
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = editId
        ? `http://localhost:5000/api/stockout/${editId}`
        : 'http://localhost:5000/api/stockout';
      const method = editId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setShowPopup(false);
        setFormData({
          StockOutUnitPrice: '',
          StockOutQuality: '',
          StockOutTotalPrice: '',
          StockOutDate: '',
        });
        setEditId(null);
        fetchStockOuts();
      } else {
        setError(data.message || 'Failed to save stock out');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/stockout/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      if (response.ok) {
        fetchStockOuts();
      } else {
        alert('Failed to delete record');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div>
      <MenuBar />
      <div className="p-4">
        <button
          onClick={() => {
            setFormData({
              StockOutUnitPrice: '',
              StockOutQuality: '',
              StockOutTotalPrice: '',
              StockOutDate: '',
            });
            setEditId(null);
            setShowPopup(true);
          }}
          className="mb-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          {editId ? 'Edit Stock Out' : 'Add Stock Out'}
        </button>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-md w-96"
            >
              <h2 className="text-xl mb-4">{editId ? 'Edit Stock Out' : 'Add Stock Out'}</h2>
              {error && <p className="text-red-600 mb-2">{error}</p>}
              <input
                type="number"
                step="0.01"
                name="StockOutUnitPrice"
                placeholder="Unit Price"
                value={formData.StockOutUnitPrice}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="StockOutQuality"
                placeholder="Quality"
                value={formData.StockOutQuality}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                step="0.01"
                name="StockOutTotalPrice"
                placeholder="Total Price"
                value={formData.StockOutTotalPrice}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="date"
                name="StockOutDate"
                placeholder="Date"
                value={formData.StockOutDate}
                onChange={handleChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  {editId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        )}
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Unit Price</th>
              <th className="border px-2 py-1">Quality</th>
              <th className="border px-2 py-1">Total Price</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockOuts.map((stock) => (
              <tr key={stock.id}>
                <td className="border px-2 py-1">{stock.StockOutUnitPrice}</td>
                <td className="border px-2 py-1">{stock.StockOutQuality}</td>
                <td className="border px-2 py-1">{stock.StockOutTotalPrice}</td>
                <td className="border px-2 py-1">{stock.StockOutDate}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => openEditPopup(stock)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOut;
