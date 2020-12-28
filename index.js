const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');

// database
const url = 'mongodb://localhost/Todo';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const con = mongoose.connection;
con.on('open', () => {
    console.log('connected');
});

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//CORS
app.use(cors);

// routes
app.use ('/api/todos', require('./route/api/todos'));
app.use ('/api/users', require('./route/api/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));