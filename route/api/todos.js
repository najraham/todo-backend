const express = require('express');
const router = express.Router();
const todos = require('../../data/todos');
const uuid = require('uuid');

// get all todos
router.get('/', (req,res) => {
    res.send(todos);
});

// get one todo
router.get('/:id', (req,res) => {
    const found = todos.some(todo => todo.id === parseInt(req.params.id));

    if(found) {
        res.json(todos.filter(todo => todo.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json ({ msg: `No todo with the id of ${req.params.id}` })
    }
});

// create todo
router.post('/', (req,res) => {
    const newTodo = {
        id: uuid.v4(),
        title: req.body.title,
        description: req.body.description
    }

    if(!newTodo.title) {
        return res.status(400).json({  msg: "Please include the title" });
    }

    todos.push(newTodo);
    res.send(todos);
});

// Update todo
router.put('/:id', (req,res) => {
    const found = todos.some(todo => todo.id === parseInt(req.params.id));

    if(found) {
        const updateTodo = req.body;

        todos.forEach(todo => {
            if(todo.id === parseInt(req.params.id)) {
                todo.title = updateTodo.title ? updateTodo.title : todo.title;
                todo.description = updateTodo.description ? updateTodo.description : todo.description;
                res.json({msg: "Todo updated", todo: todo});
            }
        });
    }
    else {
        res.status(400).json ({ msg: `No todo with the id of ${req.params.id}` })
    }
});

// delete todo
router.delete('/:id', (req,res) => {
    const found = todos.some(todo => todo.id === parseInt(req.params.id));

    if(found) {
        res.json({msg: "Todo deleted", todos: todos.filter(todo => todo.id !== parseInt(req.params.id))});
    }
    else {
        res.status(400).json ({ msg: `No todo with the id of ${req.params.id}` })
    }
});

module.exports = router;