const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors")
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Connecting to MongoDB
connectDB();
app.use(express.json());

app.use(cors())
// Defining routes
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

module.exports = app;