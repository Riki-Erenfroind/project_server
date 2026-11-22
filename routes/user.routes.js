const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook
} = require('../controller/user.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/borrow', borrowBook);

module.exports = router;