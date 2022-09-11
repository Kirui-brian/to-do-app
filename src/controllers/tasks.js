const TaskSchema = require('../models/Task.js');

module.exports.controller = (router) => {
   
    // add a new task - Post method
    router.post('/tasks', async (req, res) => {
        const newTask = new TaskSchema({
            name: req.body.name,
            status: req.body.status,
        });
        
        newTask.save((error, task) => {
            if (error) { console.log(error); }
            res.send(task);
        });
    });

    //Get all method
    router.get('/tasks/getAll', async (req, res) => {
        try {
            const data = await Task.find();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    });

    //Get by ID Method
    router.get('/getOne/:id', async (req, res) => {
        try {
            const data = await Task.findById(req.params.id);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

    //Update by ID Method
    router.patch('/update/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };

            const result = await Task.findByIdAndUpdate(
                id, updatedData, options
            )

            res.send(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    })

    //Delete by ID Method
    router.delete('/delete/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const data = await Task.findByIdAndDelete(id)
            res.send(`Task with ${data.name} has been deleted.`)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
};
