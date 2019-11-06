const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://miau:miau@miau-fi2ut.mongodb.net/miau?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(express.json());
app.use(routes);

require('./app/controllers/authController')(app);
require('./app/controllers/sessionController')(app);

app.listen(3333);