const express = require('express');
const app = express();
const PORT = 5000;

const apiRoutes = require('./routes/index');

app.use(express.json());

// הפנייה לכל הניתובים תחת הקידומת /api
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});