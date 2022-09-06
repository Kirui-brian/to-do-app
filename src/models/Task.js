const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 20
    },
    status: String,
});

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task;
