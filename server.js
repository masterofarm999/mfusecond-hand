// ------------------------------
// 1. โหลดโมดูลที่ต้องใช้
// ------------------------------
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

// ------------------------------
// 2. ตั้งค่า Express
// ------------------------------
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ------------------------------
// 3. ตั้งค่าฐานข้อมูล PostgreSQL
// ------------------------------
const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false } // ✅ จำเป็นบน Render
});


// ------------------------------
// 4. Route ทดสอบหน้าเว็บหลัก
// ------------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ------------------------------
// 5. Route ทดสอบ Database
// ------------------------------
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: '✅ Database connected successfully!',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// ------------------------------
// 6. รัน Server
// ------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
console.log("Backend server started successfully!");