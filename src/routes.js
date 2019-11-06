const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const authController = require('./app/controllers/authController');
const animalController = require('./app/controllers/animalController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/users', (req, res) =>{
    return res.json(req.body);
});

routes.post('/animal', upload.single('img'), animalController.store);

module.exports = routes;