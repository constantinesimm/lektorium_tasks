const mongoose = require('mongoose');

const {uri, options} = {
    uri: 'mongodb://127.0.0.1:27017/tasks',
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
};

module.exports = async () => await mongoose.connect(uri, options);