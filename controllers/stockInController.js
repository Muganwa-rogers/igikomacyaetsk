const db = require('../db');

const addStockIn = async (req, res) => {
  const { StockInQuality, StockInDate } = req.body;
  if (!StockInQuality || !StockInDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    await db.execute(
      'INSERT INTO Stockin (StockInQuality, StockInDate) VALUES (?, ?)',
      [StockInQuality, StockInDate]
    );
    res.status(201).json({ message: 'Stock in added successfully' });
  } catch (error) {
    console.error('Error adding stock in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStockIns = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Stockin');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stock ins:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addStockIn, getStockIns };
