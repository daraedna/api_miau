const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    observation: {
        type: String,
    },
    sex:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //referencia de qual model
        ref: 'User'
    }
});

module.exports = mongoose.model('Animal', AnimalSchema)