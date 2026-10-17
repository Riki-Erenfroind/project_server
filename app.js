const express = require('express');
const app = express();
const PORT = 5000;

// ייבוא בסיס הנתונים
const db = require('./db/db');

// Middleware לפענוח JSON ב-Body של הבקשות
app.use(express.json());

// 1. קבלת כל הספרים (כולל תמיכה ב-pagination וסינון לפי שם/קטגוריה)
app.get('/books', (req, res) => {
    let { page = 1, limit = 10, name, category } = req.query;
    
    let results = [...db.books];

    // סינון לפי שם (אם הוגדר)
    if (name) {
        results = results.filter(b => b.name.includes(name));
    }

    // סינון לפי קטגוריה (אם הוגדר)
    if (category) {
        results = results.filter(b => b.category.includes(category));
    }

    // Pagination (חלוקה לעמודים)
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedBooks = results.slice(startIndex, endIndex);

    res.status(200).json({
        total: results.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: paginatedBooks
    });
});

// 2. קבלת ספר לפי קוד (ID)
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = db.books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "הספר לא נמצא" });
    }

    res.status(200).json(book);
});

// 3. הוספת ספר חדש
app.post('/books', (req, res) => {
    const { name, category, price } = req.body;

    if (!name || !category || !price) {
        return res.status(400).json({ error: "נא לספק שם, קטגוריה ומחיר" });
    }

    const newBook = {
        id: db.books.length > 0 ? db.books[db.books.length - 1].id + 1 : 1,
        name,
        category,
        price,
        isBorrowed: false,
        borrowDate: null,
        clientId: null
    };

    db.books.push(newBook);
    res.status(201).json(newBook);
});

// 4. עדכון ספר (מעדכן את כל הפרטים מלבד שדות הקשורים להשאלה)
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = db.books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "הספר לא נמצא" });
    }

    const { name, category, price } = req.body;
    
    // עדכון השדות המותרים בלבד
    if (name) db.books[bookIndex].name = name;
    if (category) db.books[bookIndex].category = category;
    if (price) db.books[bookIndex].price = price;

    res.status(200).json(db.books[bookIndex]);
});

// 5. ביצוע השאלה (עדכון השדה "האם מושואל?" ל-true ומערך השאלות)
app.patch('/books/:id/borrow', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = db.books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "הספר לא נמצא" });
    }

    if (book.isBorrowed) {
        return res.status(400).json({ error: "הספר כבר מושאל" });
    }

    const { clientId, borrowDate } = req.body;
    if (!clientId || !borrowDate) {
        return res.status(400).json({ error: "חובה לספק מזהה לקוח ותאריך השאלה" });
    }

    book.isBorrowed = true;
    book.borrowDate = borrowDate;
    book.clientId = clientId;

    res.status(200).json(book);
});

// 6. ביצוע החזרה (עדכון השדה "האם מושואל?" ל-false)
app.patch('/books/:id/return', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = db.books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "הספר לא נמצא" });
    }

    book.isBorrowed = false;
    book.borrowDate = null;
    book.clientId = null;

    res.status(200).json(book);
});

// 7. מחיקת ספר לפי קוד
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = db.books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "הספר לא נמצא" });
    }

    const deletedBook = db.books.splice(bookIndex, 1);
    res.status(200).json({ message: "הספר נמחק בהצלחה", deletedBook });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});