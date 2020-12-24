const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');

// get all todos
router.get('/', async(req,res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    } catch(error) {
        res.send('Error : ' + error);
    }
});

// get one todo
router.get('/:id', async(req,res) => {
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        try {
            const todo = await Todo.findById(req.params.id);
        
            if(todo) {
                res.json(todo);
            }
            else {
                res.status(400).json ({ msg: `No todo with the id of ${req.params.id}` })
            }   
        } catch (error) {
            res.send('Error : ' + error);
        }
    }
    else{
        res.status(400).json ({ msg: "id is invalid" })
    }
});

// create todo
router.post('/', async(req,res) => {
    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description
    })
    try {
        if(!(newTodo.title || newTodo.description)) {
            return res.status(400).json({  msg: "Please include the title" });
        }
        const t1 = await newTodo.save();
        res.json(t1);
    } catch (error) {
        res.send('Error : ' + error);
    }
});

// Update todo
router.put('/:id', async(req,res) => {
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        try {
            const todo = await Todo.findById(req.params.id);
        
            if(todo) {
                const updateTodo = req.body;
    
                todo.title = updateTodo.title ? updateTodo.title : todo.title;
                todo.description = updateTodo.description ? updateTodo.description : todo.description;
                
                const t1 = await todo.save();
                res.json(t1);
            }
            else {
                res.status(400).json ({ msg: `No todo with the id of ${req.params.id}` });
            }
        } catch (error) {
            res.send('Error : ' + error);
        }
    }
    else{
        res.status(400).json ({ msg: "id is invalid" })
    }
});

// delete todo
router.delete('/:id', async(req,res) => {
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        try {
            const todo = await Todo.findById(req.params.id);
        
            if(todo) {
                await todo.delete();
                res.json({msg: "Todo deleted"});
            }
            else {
                res.status(400).json ({ msg: `No todo with the id of ${req.params.id}` })
            }
        } catch (error) {
            res.send('Error : ' + error);
        }
    }
    else{
        res.status(400).json ({ msg: "id is invalid" })
    }
});

module.exports = router;