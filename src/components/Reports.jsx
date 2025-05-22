import React, { useState, useEffect, useContext } from 'react';
import MenuBar from './MenuBar';
import { AuthContext } from '../App';

const Reports = () => {
  const { token } = useContext(AuthContext);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError('Failed to fetch reports');
      console.error('Error fetching reports:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (error) {
    return (
      <div>
        <MenuBar />
        <div className="p-4 text-red-600">{error}</div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div>
        <MenuBar />
        <div className="p-4">Loading reports...</div>
      </div>
    );
  }

  return (
    <div>
      <MenuBar />
      <div className="p-4">
        <h2 className="text-2xl mb-4">Reports</h2>
        <table className="w-full border border-gray-300">
          <tbody>
            <tr>
              <td className="border px-2 py-1 font-semibold">Total Stock In</td>
              <td className="border px-2 py-1">{reportData.totalStockIn}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-semibold">Total Quality In</td>
              <td className="border px-2 py-1">{reportData.totalQualityIn}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-semibold">Total Stock Out</td>
              <td className="border px-2 py-1">{reportData.totalStockOut}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-semibold">Total Value Out</td>
              <td className="border px-2 py-1">{reportData.totalValueOut}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
