const Joi = require('joi');

// 1. סכמה להרשמת משתמש (User Sign-up)
const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// 2. סכמה להתחברות משתמש (User Sign-in)
const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// 3. סכמה להוספת ספר חדש (Add Book)
const bookSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(2).required(),
    year: Joi.number().integer().min(1000).max(2026).required()
});


// --- Middleware גנרי לבדיקת תקינות (סעיף 16) ---
const validate = (schema) => {
    return (req, res, next) => {
        // abortEarly: false גורם ל-Joi לאסוף את *כל* השגיאות ולא לעצור בשגיאה הראשונה
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            // איסוף כל הודעות השגיאה
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({
                error: {
                    message: errorMessages,
                    type: 'validation error'
                }
            });
        }
        next(); // אם הכל תקין, ממשיכים הלאה ל-Controller
    };
};

module.exports = {
    signupSchema,
    signinSchema,
    bookSchema,
    validate
};