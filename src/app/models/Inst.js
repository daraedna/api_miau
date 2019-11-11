const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const InstSchema = new mongoose.Schema({
    nameInst: {
        type: String,
        required: true,
        unique: true,
    },
    emailInst: {
        type: String,
        required: true,
        lowercase: true,
    },
    passwordInst: {
        type: String,
        required: true,
        select: false,
    },
    phoneInst: {
        type: Number,
        required: true,
    },
    descritionInst:{
        type: String,
    },
    cityInst: {
        type: String,
    },
    stateInst:{
        type: String,
    },
    createdAtInst: {
        type: Date,
        default: Date.now,
    }
});

InstSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.passwordInst, 10);
    this.passwordInst = hash;

    next();
});

const Inst =  mongoose.model('Inst', InstSchema);

module.exports = Inst;