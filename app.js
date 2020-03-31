const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//static path and files
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => res.sendFile('index.html', { root: 'public' }));

//socket chat
require('./modules/chat/chat')();

//catch 404 and forward to central error handler
app.use('*', (req, res, next) => {
   if (res.status(404)) {
       next(404);
   }
});

//central error handler
app.use((error, req, res) => {
    let statusCode = error || 500;
    let statusMsg = {
        404: 'Not found',
        500: 'Server Internal Error'
    };

    return res.status(statusCode).end(statusCode === error ? statusMsg['404'] : statusMsg['500']);
});

module.exports = app;
