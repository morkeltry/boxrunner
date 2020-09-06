const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');;
const cookieParser = require('cookie-parser');

const router = require('./controllers/index');

const app = express();


app.set('port', process.env.PORT || 7777);

app.use(cookieParser());
app.use('/', router);

// app.use(router);

module.exports = app;
