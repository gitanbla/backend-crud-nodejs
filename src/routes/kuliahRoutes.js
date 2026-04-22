const express = require('express');
const router = express.Router();
const controller = require('../controllers/kuliahController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', controller.getSemua);
router.get('/:id', controller.getSatu);

router.post('/', upload.single('foto'), controller.tambah);
router.put('/:id', upload.single('foto'), controller.ubah);

router.delete('/:id', controller.hapus);

module.exports = router;