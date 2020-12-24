const express = require('express');
const mongoose = require('mongoose');

// database
const url = 'mongodb://localhost/Todo';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }); 

// routes
app.use ('/api/todos', require('./route/api/todos'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));