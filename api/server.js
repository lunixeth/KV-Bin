const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config()

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes 
app.use('/', require('./routes/Register'));
app.use('/', require('./routes/Login'));

// Database Connection
mongoose.connect(process.env.URI, { useNewUrlParser: true}, () => {
    console.log('✨ MongoDB Connected')
})

// Start Server
app.listen(5000, () => {
    console.log('🚀 Server Up & Running on PORT 5000')
})