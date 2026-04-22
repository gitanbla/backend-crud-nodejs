const Model = require('../models/provinsiModel');

const getSemua = async (req, res) => {
  try { res.json(await Model.getAll()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

const getSatu = async (req, res) => {
  try { res.json(await Model.getById(req.params.id)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

const tambah = async (req, res) => {
  try { res.json(await Model.create(req.body.nama_provinsi)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

const ubah = async (req, res) => {
  try {
    const idParam = req.params.id;
    const dataDariDB = await Model.getById(idParam); // Saya ganti nama variabelnya agar tidak bentrok

    if (!dataDariDB) {
      return res.status(404).json({ error: "ID tidak ditemukan" });
    }

    let namaBaru = dataDariDB.nama_provinsi; 
    if (req.body && req.body.nama_provinsi) {
      namaBaru = req.body.nama_provinsi;
    }

    const hasil = await Model.update(idParam, { nama_provinsi: namaBaru });
    res.json(hasil);

  } catch (err) {
    console.error("Error di Baris 27 atau sekitarnya:", err);
    res.status(500).json({ error: err.message });
  }
};

const hapus = async (req, res) => {
  try { 
    await Model.remove(req.params.id);
    res.json({ message: 'Data provinsi berhasil dihapus' }); 
  } 
  catch (err) { 
    if (err.code === '23503') { // Kode error Foreign Key di PostgreSQL
        return res.status(400).json({ 
            error: 'Tidak bisa menghapus provinsi ini karena masih ada data kabupaten di dalamnya!' 
        });
    }
    res.status(500).json({ error: err.message }); 
  }
};

module.exports = { getSemua, getSatu, tambah, ubah, hapus };