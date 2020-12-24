const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    // id: {
    //     type: BigInt,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);