const express = require('express');

const app = express();

// app.get('/', (req,res) => {
//     res.send(todos);
// });

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use ('/api/todos', require('./route/api/todos'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));