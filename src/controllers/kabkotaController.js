const Model = require('../models/kabkotaModel');

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
    const hasil = await Model.create(req.body); 
    res.json(hasil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ubah = async (req, res) => {
  try { res.json(await Model.update(req.params.id, req.body.id_provinsi, req.body.nama_kabkota)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

const hapus = async (req, res) => {
  try { res.json(await Model.remove(req.params.id)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getSemua, getSatu, tambah, ubah, hapus };