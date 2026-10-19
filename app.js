const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = 5000;


const apiRoutes = require('./routes/index');

const dateLogger = (req, res, next) => {
    const currentDate = new Date().toISOString();
    console.log(`[${currentDate}] - Request Method: ${req.method}, URL: ${req.url}`);
    next(); 


app.use(helmet());            
app.use(morgan('dev'));    
app.use(dateLogger);                 
app.use(express.json());             


app.use('/api', apiRoutes);




app.use((req, res, next) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            type: 'not found error'
        }
    });
});


app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    
   
    const isDev = process.env.NODE_ENV !== 'production';

    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
            type: 'server error',
            ...(isDev && { stack: err.stack }) 
        }
    });
});


// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});