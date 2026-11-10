const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const DB_URI = "mongodb+srv://r0504118136_db_user:Riki1234@cluster0.gqujwvj.mongodb.net/libraryDB?retryWrites=true&w=majority";
        await mongoose.connect(DB_URI);
        console.log('MongoDB Connected successfully!');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;