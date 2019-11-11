const express = require('express');
const authRoutes = express.Router( );

const authController = require('../controllers/authController');

authRoutes.post('/authenticate', authController.index);
authRoutes.post('/register', authController.store);

module.exports = authRoutes;