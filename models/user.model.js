const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    phone: { 
        type: String, 
        required: true,
        match: /^0[2-9]\d{7,8}$/
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 4 
    },
    registrationDate: { 
        type: Date, 
        default: Date.now 
    },
    borrowedBooks: [{
        code: String,
        title: String
    }]
});

module.exports = mongoose.model('User', userSchema);