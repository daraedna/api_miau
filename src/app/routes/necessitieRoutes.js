const express = require('express');
const necessitieRoutes = express.Router( );
const multer = require('multer');
const uploadConfig = require('../../config/upload');

const necessitieController = require('../controllers/necessitieController');
const upload = multer(uploadConfig);

necessitieRoutes.get('/necessities', necessitieController.filter);
necessitieRoutes.get('/necessitiesList', necessitieController.index);
necessitieRoutes.post('/necessitie', upload.single('img_nec'), necessitieController.store);
necessitieRoutes.delete('/necessities', necessitieController.delete);

module.exports = necessitieRoutes;