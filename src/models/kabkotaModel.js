const pool = require('../config/db');

const getAll = async () => {
  const query = `
    SELECT k.*, p.nama_provinsi 
    FROM kabkota k 
    LEFT JOIN provinsi p ON k.id_provinsi = p.id ORDER BY k.id ASC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

const getById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM kabkota WHERE id = $1', [id]);
  return rows[0];
};

const create = async (data) => {
  const { id, id_provinsi, nama_kabkota } = data;
  const query = `
    INSERT INTO kabkota (id, id_provinsi, nama_kabkota) 
    VALUES ($1, $2, $3) 
    RETURNING *
  `;
  const { rows } = await pool.query(query, [id, id_provinsi, nama_kabkota]);
  return rows[0];
};

const update = async (id, id_provinsi, nama_kabkota) => {
  const { rows } = await pool.query(
    'UPDATE kabkota SET id_provinsi = $1, nama_kabkota = $2 WHERE id = $3 RETURNING *',
    [id_provinsi, nama_kabkota, id]
  );
  return rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM kabkota WHERE id = $1', [id]);
  return { message: 'Data kabkota berhasil dihapus' };
};

module.exports = { getAll, getById, create, update, remove };