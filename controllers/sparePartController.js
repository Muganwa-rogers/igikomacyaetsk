const db = require('../db');

const addSparePart = async (req, res) => {
  const { Name, Category, Quality, UnitPrice, TotalPrice } = req.body;
  if (!Name || !Category || !Quality || !UnitPrice || !TotalPrice) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    await db.execute(
      'INSERT INTO Spare_Part (Name, Category, Quality, UnitPrice, TotalPrice) VALUES (?, ?, ?, ?, ?)',
      [Name, Category, Quality, UnitPrice, TotalPrice]
    );
    res.status(201).json({ message: 'Spare part added successfully' });
  } catch (error) {
    console.error('Error adding spare part:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSpareParts = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Spare_Part');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching spare parts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addSparePart, getSpareParts };
