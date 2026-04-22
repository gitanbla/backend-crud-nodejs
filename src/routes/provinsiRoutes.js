const express = require('express');
const router = express.Router();
const controller = require('../controllers/provinsiController');
const multer = require('multer'); 
const upload = multer(); 

router.get('/', controller.getSemua);
router.get('/:id', controller.getSatu);
router.post('/', upload.none(), controller.tambah);
router.put('/:id', upload.none(), controller.ubah); 
router.delete('/:id', controller.hapus);

module.exports = router;