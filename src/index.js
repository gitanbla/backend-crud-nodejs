const express = require('express');
const cors = require('cors');
require('dotenv').config();

const provinsiRoutes = require('./routes/provinsiRoutes');
const kabkotaRoutes = require('./routes/kabkotaRoutes');
const kuliahRoutes = require('./routes/kuliahRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Mengizinkan frontend mengakses API ini
app.use(express.json()); // Membaca body request format JSON
app.use(express.urlencoded({ extended: true })); // Membaca body request format Form Data

app.use('/uploads', express.static('storage/uploads'));

app.use('/api/provinsi', provinsiRoutes);
app.use('/api/kabkota', kabkotaRoutes);
app.use('/api/kuliah', kuliahRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

app.listen(port, () => {
  console.log(`================================`);
  console.log(`🚀 Server berjalan di port ${port}`);
  console.log(`================================`);
  console.log(`📍 Endpoint Provinsi : http://localhost:${port}/api/provinsi`);
  console.log(`📍 Endpoint Kab/Kota : http://localhost:${port}/api/kabkota`);
  console.log(`📍 Endpoint Kuliah   : http://localhost:${port}/api/kuliah`);
  console.log(`================================`);
});