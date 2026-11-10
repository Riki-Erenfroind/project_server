const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: 2, 
        maxlength: 20 
    },
    price: { type: Number, required: true },
    categories: { 
        type: [String], 
        required: true,
        enum: ['Fiction', 'Science', 'History', 'Children', 'Art']
    },
    author: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true }
    }
});

module.exports = mongoose.model('Book', bookSchema);