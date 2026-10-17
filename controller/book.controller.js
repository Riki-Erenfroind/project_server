const db = require('../DB/db');

const getAllBooks = (req, res) => {
    let { page = 1, limit = 10, name, category } = req.query;
    let results = [...db.books];

    if (name) {
        results = results.filter(b => b.name.includes(name));
    }
    if (category) {
        results = results.filter(b => b.category.includes(category));
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedBooks = results.slice(startIndex, endIndex);

    res.status(200).json({
        total: results.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: paginatedBooks
    });
};

const getBookById = (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = db.books.find(b => b.id === bookId);
    if (!book) return res.status(404).json({ error: "הספר לא נמצא" });
    res.status(200).json(book);
};

const createBook = (req, res) => {
    const { name, category, price } = req.body;
    if (!name || !category || !price) {
        return res.status(400).json({ error: "נא לספק שם, קטגוריה ומחיר" });
    }
    const newBook = {
        id: db.books.length > 0 ? db.books[db.books.length - 1].id + 1 : 1,
        name, category, price,
        isBorrowed: false, borrowDate: null, clientId: null
    };
    db.books.push(newBook);
    res.status(201).json(newBook);
};

const updateBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = db.books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) return res.status(404).json({ error: "הספר לא נמצא" });

    const { name, category, price } = req.body;
    if (name) db.books[bookIndex].name = name;
    if (category) db.books[bookIndex].category = category;
    if (price) db.books[bookIndex].price = price;

    res.status(200).json(db.books[bookIndex]);
};

const deleteBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = db.books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) return res.status(404).json({ error: "הספר לא נמצא" });

    const deletedBook = db.books.splice(bookIndex, 1);
    res.status(200).json({ message: "הספר נמחק בהצלחה", deletedBook });
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };