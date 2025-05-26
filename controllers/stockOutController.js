const db = require('../db');

const addStockOut = async (req, res) => {
  const { StockOutUnitPrice, StockOutQuality, StockOutTotalPrice, StockOutDate } = req.body;
  if (!StockOutUnitPrice || !StockOutQuality || !StockOutTotalPrice || !StockOutDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    await db.execute(
      'INSERT INTO Stock_Out (StockOutUnitPrice, StockOutQuality, StockOutTotalPrice, StockOutDate) VALUES (?, ?, ?, ?)',
      [StockOutUnitPrice, StockOutQuality, StockOutTotalPrice, StockOutDate]
    );
    res.status(201).json({ message: 'Stock out added successfully' });
  } catch (error) {
    console.error('Error adding stock out:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStockOuts = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Stock_Out');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stock outs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStockOut = async (req, res) => {
  const { id } = req.params;
  const { StockOutUnitPrice, StockOutQuality, StockOutTotalPrice, StockOutDate } = req.body;
  if (!StockOutUnitPrice || !StockOutQuality || !StockOutTotalPrice || !StockOutDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const [result] = await db.execute(
      'UPDATE Stock_Out SET StockOutUnitPrice = ?, StockOutQuality = ?, StockOutTotalPrice = ?, StockOutDate = ? WHERE id = ?',
      [StockOutUnitPrice, StockOutQuality, StockOutTotalPrice, StockOutDate, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Stock out not found' });
    }
    res.json({ message: 'Stock out updated successfully' });
  } catch (error) {
    console.error('Error updating stock out:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteStockOut = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM Stock_Out WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Stock out not found' });
    }
    res.json({ message: 'Stock out deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock out:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addStockOut, getStockOuts, updateStockOut, deleteStockOut };
