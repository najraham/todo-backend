const express = require('express');
const router = express.Router();
const todoController = require('../../controllers/todoController');

// get all todos
router.get('/', todoController.index);

// change status
router.put('/:id', todoController.changeStatus);

// get one todo
router.get('/:id', todoController.todoDetail);

// create todo
router.post('/', todoController.create);

// Update todo
router.put('/:id', todoController.update);

// delete todo
router.delete('/:id', todoController.delete);

module.exports = router;