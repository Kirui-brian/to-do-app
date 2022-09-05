const TaskSchema = require('../models/Task.js');

module.exports.controller = (app) => {
    // add a new task
    app.post('/tasks', (req, res) => {
        const newTask = new TaskSchema({
            name: req.body.name,
            id: req.body.id,
            status: req.body.status,
        });
        
        newTask.save((error, task) => {
            if (error) { console.log(error); }
            res.send(task);
        });
    });
};
