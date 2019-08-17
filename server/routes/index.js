const express = require('express');
const app = express();

app.use(require('./routes/person'));
app.use(require('./routes/activity'));
app.use(require('./routes/notification'));
app.use(require('./routes/sponsor'));

module.exports = app;