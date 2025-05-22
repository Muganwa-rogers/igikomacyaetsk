import React, { useState, useEffect, useContext } from 'react';
import MenuBar from './MenuBar';
import { AuthContext } from '../App';

const SparePart = () => {
  const { token } = useContext(AuthContext);
  const [spareParts, setSpareParts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Category: '',
    Quality: '',
    UnitPrice: '',
    TotalPrice: '',
  });
  const [error, setError] = useState('');

  const fetchSpareParts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sparepart', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await response.json();
      setSpareParts(data);
    } catch (err) {
      console.error('Error fetching spare parts:', err);
    }
  };

  useEffect(() => {
    fetchSpareParts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/sparepart', {
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
          Name: '',
          Category: '',
          Quality: '',
          UnitPrice: '',
          TotalPrice: '',
        });
        fetchSpareParts();
      } else {
        setError(data.message || 'Failed to add spare part');
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
          Add Spare Part
        </button>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-md w-96"
            >
              <h2 className="text-xl mb-4">Add Spare Part</h2>
              {error && <p className="text-red-600 mb-2">{error}</p>}
              <input
                type="text"
                name="Name"
                placeholder="Name"
                value={formData.Name}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="Category"
                placeholder="Category"
                value={formData.Category}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="Quality"
                placeholder="Quality"
                value={formData.Quality}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                step="0.01"
                name="UnitPrice"
                placeholder="Unit Price"
                value={formData.UnitPrice}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                step="0.01"
                name="TotalPrice"
                placeholder="Total Price"
                value={formData.TotalPrice}
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
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Quality</th>
              <th className="border px-2 py-1">Unit Price</th>
              <th className="border px-2 py-1">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((part) => (
              <tr key={part.id}>
                <td className="border px-2 py-1">{part.Name}</td>
                <td className="border px-2 py-1">{part.Category}</td>
                <td className="border px-2 py-1">{part.Quality}</td>
                <td className="border px-2 py-1">{part.UnitPrice}</td>
                <td className="border px-2 py-1">{part.TotalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SparePart;
