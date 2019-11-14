const express = require('express');
const necessitieRoutes = express.Router( );

const necessitieController = require('../controllers/necessitieController');

necessitieRoutes.get('/necessities', necessitieController.index);
necessitieRoutes.post('/necessitie', necessitieController.store);

module.exports = necessitieRoutes;