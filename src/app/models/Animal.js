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
    size:{
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        //referencia de qual model
        ref: 'User'
    },
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Animal', AnimalSchema)