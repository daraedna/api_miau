const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

mongoose.connect('mongodb+srv://miau:miau@miau-fi2ut.mongodb.net/miau?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const authRoutes = require('./app/routes/authRoutes');
const animalRoutes = require('./app/routes/animalRoutes');

const corsConfig = {
    origin: '*',
    optionsSucessStatus: 200,
}

app.use(express.static('uploads'));
app.use(cors(corsConfig));
app.use(express.json());

app.use(authRoutes);
app.use(animalRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`SERVER RUNNING ON THE PORT: ${PORT}`));