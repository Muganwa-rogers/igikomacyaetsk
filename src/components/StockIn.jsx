import React, { useState, useEffect, useContext } from 'react';
import MenuBar from './MenuBar';
import { AuthContext } from '../App';

const StockIn = () => {
  const { token } = useContext(AuthContext);
  const [stockIns, setStockIns] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    StockInQuality: '',
    StockInDate: '',
  });
  const [error, setError] = useState('');

  const fetchStockIns = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stockin', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await response.json();
      setStockIns(data);
    } catch (err) {
      console.error('Error fetching stock ins:', err);
    }
  };

  useEffect(() => {
    fetchStockIns();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/stockin', {
        method: 'POST',
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
          StockInQuality: '',
          StockInDate: '',
        });
        fetchStockIns();
      } else {
        setError(data.message || 'Failed to add stock in');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div>
      <MenuBar />
      <div className="p-4">
        <button
          onClick={() => setShowPopup(true)}
          className="mb-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Add Stock In
        </button>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-md w-96"
            >
              <h2 className="text-xl mb-4">Add Stock In</h2>
              {error && <p className="text-red-600 mb-2">{error}</p>}
              <input
                type="text"
                name="StockInQuality"
                placeholder="Stock In Quality"
                value={formData.StockInQuality}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="date"
                name="StockInDate"
                placeholder="Stock In Date"
                value={formData.StockInDate}
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
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Quality</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {stockIns.map((stock) => (
              <tr key={stock.id}>
                <td className="border px-2 py-1">{stock.StockInQuality}</td>
                <td className="border px-2 py-1">{stock.StockInDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockIn;
