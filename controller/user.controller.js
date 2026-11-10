const User = require('../models/user.model');

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

module.exports = {
    getAllUsers,
    getUserById,
    createUser
};