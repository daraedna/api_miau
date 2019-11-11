const express = require('express');
const instRoutes = express.Router( );
const showRoutes = express.Router( );

const instController = require('../controllers/instController');
const showController = require('../controllers/showController');

instRoutes.post('/authenticateInst', instController.index);
instRoutes.post('/registerInst', instController.store);
showRoutes.get('/listInst', showController.index);

module.exports = instRoutes;
module.exports = showRoutes;