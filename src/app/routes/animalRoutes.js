const express = require('express');
const animalRoutes = express.Router( );
const multer = require('multer');
const uploadConfig = require('../../config/upload');

const animalController = require('../controllers/animalController');
const upload = multer(uploadConfig);

animalRoutes.get('/animal', animalController.index);
animalRoutes.post('/animal', upload.single('img'), animalController.store);

module.exports = animalRoutes;