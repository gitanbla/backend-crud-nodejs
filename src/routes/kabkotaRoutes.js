const express = require('express');
const router = express.Router();
const controller = require('../controllers/kabkotaController');

router.get('/', controller.getSemua);
router.get('/:id', controller.getSatu);
router.post('/', controller.tambah);
router.put('/:id', controller.ubah);
router.delete('/:id', controller.hapus);

module.exports = router;