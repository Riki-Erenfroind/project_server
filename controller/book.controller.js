const Book = require('../models/book.model');

// קבלת כל הספרים
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// קבלת ספר לפי ID
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: { message: 'Book not found' } });
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// הוספת ספר חדש
const createBook = async (req, res, next) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        next(error);
    }
};

// עדכון ספר לפי ID
const updateBook = async (req, res, next) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ error: { message: 'Book not found' } });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
};

// מחיקת ספר לפי ID
const deleteBook = async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: { message: 'Book not found' } });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// ייצוא כל הפונקציות
module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};