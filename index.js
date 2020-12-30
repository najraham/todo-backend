const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const jwt = require('./middlewares/jwt');
const dotenv = require("dotenv");

// .env
dotenv.config();

// database
const url = 'mongodb://localhost/Todo';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const con = mongoose.connection;
con.on('open', () => {
    console.log('db connected');
});

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//CORS
app.use(cors);

// ROUTES
// Todos
app.use ('/api/todos', jwt, require('./route/api/todos'));
// Users
app.use ('/api/users', jwt, require('./route/api/users'));
// Auth
app.use ('/api', require('./route/api/auth'));

console.log(process.env.PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));