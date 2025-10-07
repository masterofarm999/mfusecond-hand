// server.js
const express = require('express');
const path = require('path');
const app = express();

// ✅ ถ้าเว็บคุณมีหน้า HTML, CSS, JS (frontend)
app.use(express.static(path.join(__dirname, 'public'))); // โฟลเดอร์ public คือ frontend

// ✅ สำหรับอ่านข้อมูลจากฟอร์ม (ถ้ามี)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ ตัวอย่าง route เริ่มต้น
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ API ตัวอย่าง
app.get('/api/test', (req, res) => {
  res.json({ message: 'MFU Second-hand Marketplace is working!' });
});

// ✅ Render ใช้ PORT จาก environment variable (สำคัญมาก)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
