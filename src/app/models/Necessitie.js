const mongoose = require('mongoose');

const NecessitieSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    qtd: {
        type: Number,
        required: true
    },
    obs: {
        type: String,
        required: true
    },
    inst_id: {
        type: mongoose.Schema.Types.ObjectId,
        //referencia de qual model
        ref: 'Inst'
    },
    inst: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Necessitie', NecessitieSchema);