const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// get all users
router.get('/', userController.index);

// get one user
router.get('/:id', userController.userDetail);

// create user
router.post('/', userController.create);

// update user
router.put('/:id', userController.update);

// delete user
router.delete('/:id', userController.delete);

module.exports = router;