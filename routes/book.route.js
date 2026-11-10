const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controller/book.controller');
const { bookSchema, validate } = require('../middlewares/book_middlewares'); // בדיקת ה-Joi שעשינו קודם
const upload = require('../middlewares/upload.middleware'); // ה-Multer שיצרנו ממש עכשיו

router.get('/', getAllBooks);
router.get('/:id', getBookById);

// נתיב הוספת ספר: כולל העלאת תמונה (upload.single), ואז בדיקת תקינות (validate), ואז שמירה (createBook)
router.post('/', upload.single('image'), validate(bookSchema), createBook);

router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;