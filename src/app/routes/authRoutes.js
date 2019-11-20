const express = require('express');
const authRoutes = express.Router( );
const multer = require('multer');
const uploadConfig = require('../../config/upload');

const authController = require('../controllers/authController');
const upload = multer(uploadConfig);


authRoutes.post('/authenticate', upload.single('img_user'), authController.index);
authRoutes.post('/register', upload.single('img_user'), authController.store);

module.exports = authRoutes;