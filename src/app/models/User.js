const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    img_user: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
    },
    state:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    toJSON: {
        virtuals: true
    }
});

UserSchema.virtual('img_user_url').get(function(){
    return `http://localhost:3331/files/${this.img_user}`
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User =  mongoose.model('User', UserSchema);

module.exports = User;