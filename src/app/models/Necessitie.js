const mongoose = require('mongoose');

const NecessitieSchema = new mongoose.Schema({
    img_nec: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    qtd: {
        type: Number,
    },
    uni_medida: {
        type: String,
    },
    obs: {
        type: String,
    },
    inst_id: {
        type: mongoose.Schema.Types.ObjectId,
        //referencia de qual model
        ref: 'Inst'
    },
    inst: {
        type: String,
        required: true
    },
    
}, {
    toJSON: {
        virtuals: true
    }
});

NecessitieSchema.virtual('img_nec_url').get(function(){
    return `http://10.0.0.104:3331/files/${this.img_nec}`
})

module.exports = mongoose.model('Necessitie', NecessitieSchema);