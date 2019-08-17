const express = require('express');
const app = express();

app.use(require('./person'));
app.use(require('./activity'));
app.use(require('./notification'));
app.use(require('./sponsor'));
app.use(require('./login'));
module.exports = app;