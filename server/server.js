require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
//\\\\\\\\\\\\\\\\\\
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/person'));
app.use(require('./routes/activity'));
app.use(require('./routes/notification'));
app.use(require('./routes/sponsor'));
mongoose.connect('mongodb://localhost:27017/itec', { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos online');
    })

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});