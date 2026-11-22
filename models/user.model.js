const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        returnDate: {
            type: Date,
            required: true
        }
    },
    { _id: false }
);

const loanHistorySchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        borrowedAt: {
            type: Date,
            default: Date.now
        },
        returnDate: {
            type: Date,
            required: true
        },
        returnedAt: {
            type: Date,
            default: null
        }
    },
    { _id: false }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            match: [/^05\d-?\d{7}$/, 'Invalid Israeli phone number']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [4, 'Password must be at least 4 characters']
        },
        registrationDate: {
            type: Date,
            default: Date.now
        },
        borrowedBooks: {
            type: [borrowedBookSchema],
            validate: {
                validator: function (arr) {
                    return arr.length <= 3;
                },
                message: 'A user can borrow up to 3 books at a time'
            },
            default: []
        },
        loanHistory: {
            type: [loanHistorySchema],
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);