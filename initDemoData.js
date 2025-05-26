const db = require('./db');
const bcrypt = require('bcrypt');

async function initDemoData() {
  try {
    // Create users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    // Insert demo user with hashed password
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.execute('INSERT IGNORE INTO users (username, password) VALUES (?, ?)', ['admin', hashedPassword]);

    // Create Spare_Part table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS Spare_Part (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255),
        Category VARCHAR(255),
        Quality VARCHAR(255),
        UnitPrice DECIMAL(10,2),
        TotalPrice DECIMAL(10,2)
      )
    `);

    // Create Stockin table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS Stockin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        StockInQuality VARCHAR(255),
        StockInDate DATE
      )
    `);

    // Create Stock_Out table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS Stock_Out (
        id INT AUTO_INCREMENT PRIMARY KEY,
        StockOutUnitPrice DECIMAL(10,2),
        StockOutQuality VARCHAR(255),
        StockOutTotalPrice DECIMAL(10,2),
        StockOutDate DATE
      )
    `);

    // Insert demo data into Spare_Part
    await db.execute(`
      INSERT IGNORE INTO Spare_Part (Name, Category, Quality, UnitPrice, TotalPrice) VALUES
      ('Brake Pad', 'Brakes', 'High', 50.00, 500.00),
      ('Oil Filter', 'Engine', 'Medium', 20.00, 200.00)
    `);

    // Insert demo data into Stockin
    await db.execute(`
      INSERT IGNORE INTO Stockin (StockInQuality, StockInDate) VALUES
      ('High', '2024-01-01'),
      ('Medium', '2024-02-01')
    `);

    // Insert demo data into Stock_Out
    await db.execute(`
      INSERT IGNORE INTO Stock_Out (StockOutUnitPrice, StockOutQuality, StockOutTotalPrice, StockOutDate) VALUES
      (45.00, 'High', 450.00, '2024-03-01'),
      (18.00, 'Medium', 180.00, '2024-04-01')
    `);

    console.log('Demo data initialized successfully');
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
}

module.exports = initDemoData;
