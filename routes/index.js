const express = require('express');
const router = express.Router();

const bookRoutes = require('./book.route');
// const userRoutes = require('./user.route'); // ניצור בהמשך אם תרצי

router.use('/books', bookRoutes);
// router.use('/users', userRoutes);

module.exports = router;