const User = require('../models/user.model');
const Book = require('../models/book.model');

// קבלת כל המשתמשים
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// קבלת משתמש לפי ID
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: { message: 'User not found' } });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// הוספת משתמש חדש (הרשמה)
const createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

// השאלת ספר למשתמש
const borrowBook = async (req, res, next) => {
    try {
        const { userId, bookId, returnDate } = req.body;

        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ error: { message: 'User or book not found' } });
        }

        if (book.isBorrowed) {
            return res.status(400).json({ error: { message: 'Book is already borrowed' } });
        }

        if (user.borrowedBooks.length >= 3) {
            return res.status(400).json({ error: { message: 'User cannot borrow more than 3 books' } });
        }

        const dueDate = returnDate
            ? new Date(returnDate)
            : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

        const bookTitle = book.title || book.name;

        user.borrowedBooks.push({
            bookId: book._id,
            title: bookTitle,
            returnDate: dueDate
        });

        user.loanHistory.push({
            bookId: book._id,
            title: bookTitle,
            borrowedAt: new Date(),
            returnDate: dueDate
        });

        book.isBorrowed = true;

        await book.save();
        await user.save();

        res.status(200).json({
            message: 'Book borrowed successfully',
            borrowedBooks: user.borrowedBooks,
            loanHistory: user.loanHistory
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook
};