const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);