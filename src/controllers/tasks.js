const TaskSchema = require('../models/Task.js');

module.exports.controller = (server) => {
    // add a new task
    server.post('/tasks', (req, res) => {
        const newTask = new TaskSchema({
            name: req.body.name,
            status: req.body.status,
        });
        
        newTask.save((error, task) => {
            if (error) { console.log(error); }
            res.send(task);
        });

        // const task_resource = new Task({
        //     name: "Update my logbook.",
        //     status: "to-do"
        // })

        // task_resource.save((error) => {
        //     if (error)
        //         console.log(error);
        //     res.send({
        //         success: true,
        //         code: 200,
        //         msg: "task added!"
        //     })
        // })
    });
};
