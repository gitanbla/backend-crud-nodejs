const pool = require('../config/db');

const getAll = async () => {
  const query = `
  SELECT k.*, 
         TO_CHAR(k.tanggallahir, 'YYYY-MM-DD') as tanggallahir, 
         p.nama_provinsi, 
         kb.nama_kabkota
  FROM kuliah k
  LEFT JOIN provinsi p ON k.provinsi::text = p.id::text
  LEFT JOIN kabkota kb ON k.kabkota::text = kb.id::text
  ORDER BY k.id DESC
`;
  const { rows } = await pool.query(query);
  return rows;
};

const getById = async (id) => {
  // Menggunakan TO_CHAR agar format tanggal konsisten YYYY-MM-DD dan tidak terpengaruh timezone
  const { rows } = await pool.query(
    "SELECT *, TO_CHAR(tanggallahir, 'YYYY-MM-DD') as tanggallahir FROM kuliah WHERE id = $1", 
    [id]
  );
  return rows[0];
};

const create = async (data) => {
  const { nama, tempatlahir, tanggallahir, agama, alamat, telepon, jk, hobi, foto, provinsi, kabkota, citacita } = data;
  const { rows } = await pool.query(
    `INSERT INTO kuliah 
    (nama, tempatlahir, tanggallahir, agama, alamat, telepon, jk, hobi, foto, provinsi, kabkota, citacita) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [nama, tempatlahir, tanggallahir, agama, alamat, telepon, jk, hobi, foto, provinsi, kabkota, citacita]
  );
  return rows[0];
};

const update = async (id, data) => {
  const { nama, tempatlahir, tanggallahir, agama, alamat, telepon, jk, hobi, foto, provinsi, kabkota, citacita } = data;
  const { rows } = await pool.query(
    `UPDATE kuliah SET 
    nama=$1, tempatlahir=$2, tanggallahir=$3, agama=$4, alamat=$5, telepon=$6, jk=$7, hobi=$8, foto=$9, provinsi=$10, kabkota=$11, citacita=$12 
    WHERE id=$13 RETURNING *`,
    [nama, tempatlahir, tanggallahir, agama, alamat, telepon, jk, hobi, foto, provinsi, kabkota, citacita, id]
  );
  return rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM kuliah WHERE id = $1', [id]);
  return { message: 'Data kuliah berhasil dihapus' };
};

module.exports = { getAll, getById, create, update, remove };