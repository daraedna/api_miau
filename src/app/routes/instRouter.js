const express = require('express');
const authRoutes = express.Router( );

const instController = require('../controllers/instController');

authRoutes.post('/authenticateInst', instController.index);
authRoutes.post('/registerInst', instController.store);

module.exports = authRoutes;