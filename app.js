const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoDatabase = require('./services/mongoose');

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
app.use('/task4', require('./modules/task4/route'));

app.use((req, res, next) => {
    const err = new Error(`Not Found ${req.path}`);
    err.status = 404;
    next(err)
})

app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status).json({message: error.message})
    }
    if (error.errors) {
        return res.status(400).json({
            error: {
                name: error.name,
                errors: error.errors
            }
        })
    }
    next(error);
});
module.exports = app;
