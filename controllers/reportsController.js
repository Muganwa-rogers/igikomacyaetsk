const db = require('../db');

const getReports = async (req, res) => {
  try {
    // Example report: total stock in and out quantities and values
    const [stockIn] = await db.execute('SELECT COUNT(*) AS totalStockIn, SUM(StockInQuality) AS totalQualityIn FROM Stockin');
    const [stockOut] = await db.execute('SELECT COUNT(*) AS totalStockOut, SUM(StockOutTotalPrice) AS totalValueOut FROM Stock_Out');

    res.json({
      totalStockIn: stockIn[0].totalStockIn,
      totalQualityIn: stockIn[0].totalQualityIn,
      totalStockOut: stockOut[0].totalStockOut,
      totalValueOut: stockOut[0].totalValueOut,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReports };
