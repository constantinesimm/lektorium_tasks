const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalInfo = new Schema({
    userNumb: String,
    personalInfo: {},
    evolution: {
        hobbies: [{
            name: String,
            timeStarted: String,
            isKeepOnDoing: Boolean
        }],
        courses: [{
            name: String,
            timeStarted: String,
            timeEnd: String,
            isKeepOnDoing: Boolean,
            doYouLikeIt: Boolean
        }],
        skills: [{
            name: String,
            level: String,
            improvements: String
        }],
        isSectionStarted: Boolean,
        isSectionComplete: Boolean,
        isPage1Complete: Boolean,
        isPage2Complete: Boolean,
        isPage3Complete: Boolean
    }
}, { collection: 'personalInfo'});

module.exports = mongoose.model('PersonalInfo', personalInfo);