const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Book title is required'],
            minlength: [2, 'Book title must be at least 2 characters'],
            maxlength: [50, 'Book title must be at most 50 characters'],
            unique: true,
            trim: true
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ['fiction', 'non-fiction', 'science', 'history', 'biography', 'children', 'fantasy'],
                message: '{VALUE} is not a supported category'
            }
        },
        isBorrowed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);