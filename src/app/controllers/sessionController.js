const express = require('express');
const authMiddleware = require('../middlewares/auth');

const routes = express.Router();

routes.use(authMiddleware);


routes.get('/', (req, res) => {
    res.send({ ok: true,  user: req.userId });
});

module.exports = app => app.use('/session', routes);