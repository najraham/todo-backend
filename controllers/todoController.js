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

// <PATCH> change status
exports.changeStatus = ('/:id',async(req,res) => {
    if(req.params.id.match(idRegEx)) {
        try {
            const todo = await Todo.findById(req.params.id);

            if(todo) {
                if(todo.complete == false) {
                    todo.complete = true;
                }
                else {
                    todo.complete = false;
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
        complete: false
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