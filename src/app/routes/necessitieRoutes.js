const express = require('express');
const necessitieRoutes = express.Router( );

const necessitieController = require('../controllers/necessitieController');

necessitieRoutes.get('/necessities', necessitieController.filter);
necessitieRoutes.post('/necessitie', necessitieController.store);
necessitieRoutes.delete('/necessities', necessitieController.delete);

module.exports = necessitieRoutes;