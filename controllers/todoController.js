const express = require('express');
const Todo = require('../models/todo');

const idRegEx  = /^[0-9a-fA-F]{24}$/;

// <GET> get all todos 
exports.index = ('/', async(req,res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    } catch(error) {
        res.send('Error : ' + error);
    }
});

// <PUT> change status
exports.changeStatus = ('/:id',async(req,res) => {
    if(req.params.id.match(idRegEx)) {
        try {
            const todo = await Todo.findById(req.params.id);

            if(todo) {
                if(todo.status == "incomplete") {
                    todo.status = "complete";
                }
                else {
                    todo.status = "incomplete";
                }
                const t1 = await todo.save();
                res.json(t1);
            }
        } catch (error) {
            res.send('Error : ' + error);
        }
    }
    else{
        res.status(400).json ({ msg: "id is invalid" })
    }
})

// <GET> get one todo
exports.todoDetail = ('/:id', async(req,res) => {
    if(req.params.id.match(idRegEx)){
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

// <POST> create todo
exports.create = ('/', async(req,res) => {
    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description,
        status: 'incomplete'
    })
    try {
        if(!newTodo.title) {
            return res.status(400).json({  msg: "Please include the title." });
        }
        const t1 = await newTodo.save();
        res.json(t1);
    } catch (error) {
        res.send('Error : ' + error);
    }
});

// <PUT> update todo
exports.update = ('/:id', async(req,res) => {
    if(req.params.id.match(idRegEx)){
        try {
            const todo = await Todo.findById(req.params.id);
        
            if(todo) {
                const updateTodo = req.body;
    
                todo.title = updateTodo.title ? updateTodo.title : todo.title;
                todo.description = updateTodo.description ? updateTodo.description : todo.description;
                todo.status = updateTodo.status ? updateTodo.status : todo.status;
                
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

// <DELETE> delete todo
exports.delete = ('/:id', async(req,res) => {
    if(req.params.id.match(idRegEx)){
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