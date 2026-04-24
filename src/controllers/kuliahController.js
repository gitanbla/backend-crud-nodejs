const Model = require('../models/kuliahModel');

const getSemua = async (req, res) => {
  try { res.json(await Model.getAll()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

const getSatu = async (req, res) => {
  try { res.json(await Model.getById(req.params.id)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

const tambah = async (req, res) => {
  try {
    
    const namaFoto = req.file ? req.file.filename : req.body.foto;
    
    const dataYangDisimpan = { ...req.body, foto: namaFoto };

    res.json(await Model.create(dataYangDisimpan)); 
  } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

const ubah = async (req, res) => {
  try {
    console.log("Ini data dari Postman:", req.body); 
    const dataLama = await Model.getById(req.params.id);
    if (!dataLama) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }

    const namaFoto = req.file ? req.file.filename : (req.body.foto || dataLama.foto);

    const dataYangDisimpan = { 
      nama: req.body.nama || dataLama.nama,
      tempatlahir: req.body.tempatlahir || dataLama.tempatlahir,
      tanggallahir: req.body.tanggallahir || dataLama.tanggallahir,
      agama: req.body.agama || dataLama.agama,
      alamat: req.body.alamat || dataLama.alamat,
      telepon: req.body.telepon || dataLama.telepon,
      jk: req.body.jk || dataLama.jk,
      hobi: req.body.hobi || dataLama.hobi,
      provinsi: req.body.provinsi || dataLama.provinsi,
      kabkota: req.body.kabkota || dataLama.kabkota,
      citacita: req.body.citacita || dataLama.citacita,
      foto: namaFoto 
    };

    console.log("Hasil Gabungan Data:", dataYangDisimpan);

    res.json(await Model.update(req.params.id, dataYangDisimpan)); 
  } 
  catch (err) { 
    console.error("🛑 BONGKAR ERROR UPDATE:", err);
    res.status(500).json({ error: err.message }); 
  }
};

const hapus = async (req, res) => {
  try { res.json(await Model.remove(req.params.id)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getSemua, getSatu, tambah, ubah, hapus };