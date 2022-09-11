const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const router = express.Router();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/to-do-app', function () {
    console.log('Connection has been made!');
})
    .catch(err => {
        console.error('Error starting app:', err.stack);
        process.exit(1);
    });
    
// Include controllers
fs.readdirSync("controllers").forEach(function (file) {
    if (file.substring(-3) == ".js") {
        const route = require("./controllers/" + file)
        route.controller(app)
    }
})

router.get('/tasks', function (req, res) {
    res.json({ message: 'API Initialized!' });
});
const port = process.env.API_PORT || 8085;
app.use('/tasks', router);
app.listen(port, function () {
    console.log(`API running on port ${port}`);
});