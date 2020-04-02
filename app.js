const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoDatabase = require('./services/mongoose');
const HttpError = require('./middleware/http-error');
const accessMiddleware = require('./middleware/authentication');
const app = express();

mongoDatabase()
    .then( () => console.log(`MongoDB connected`) )
    .catch( error => console.log(error) );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//static path and files
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => res.sendFile('index.html', { root: 'public' }));

//task 4
app.use('/task4', accessMiddleware, require('./modules/task4/router'));

app.use('/app', require('./services/secure/router'));

//catch 404 error
app.use((req, res, next) => {
    let err = new HttpError(404, `Not Found ${req.path}`);

    next(err);
});

// error handler
app.use((error, req, res, next) => {
    if (error.status) res.status(error.status).json({ message: error.message });
    if (error.errors) res.status(400).json({ error: { name: error.name, errors: error.errors } });

    next(error);
});
module.exports = app;
