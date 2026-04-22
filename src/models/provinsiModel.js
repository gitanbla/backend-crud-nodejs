const pool = require('../config/db');

const getAll = async () => {
  const { rows } = await pool.query('SELECT * FROM provinsi ORDER BY id ASC');
  return rows;
};

const getById = async (id) => {
  const query = 'SELECT * FROM provinsi WHERE id::text = $1::text';
  const { rows } = await pool.query(query, [id]);
  
  return rows[0]; 
};

const create = async (nama_provinsi) => {
  const { rows } = await pool.query(
    'INSERT INTO provinsi (nama_provinsi) VALUES ($1) RETURNING *',
    [nama_provinsi]
  );
  return rows[0];
};

const update = async (id, data) => {
  const { nama_provinsi } = data;
  
  console.log("ID yg diupdate:", id);
  console.log("Nama baru yg diterima Model:", nama_provinsi);

  const query = `
    UPDATE provinsi 
    SET nama_provinsi = $1 
    WHERE id::text = $2::text 
    RETURNING *
  `;
  
  const { rows } = await pool.query(query, [nama_provinsi, id]);

  if (rows.length === 0) {
    console.log("Update gagal: Query jalan tapi 0 baris terupdate.");
    return null;
  }

  return rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM provinsi WHERE id = $1', [id]);
  return { message: 'Data provinsi berhasil dihapus' };
};

module.exports = { getAll, getById, create, update, remove };