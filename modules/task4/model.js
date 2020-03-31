const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalInfo = new Schema({
    userNumb: String,
    personalInfo: {
        givenName: String,
        surname: String,
        gender: String,
        dob: String,
        nationality: String,
        phoneNumber: String,
        homeAddress: String,
        city: String,
        postCode: String,
        country: String,
        passportStatus: String,
        passportNumber:String,
        passportExpectedDate: String,
        passportExpiryDate: String,
        isSectionStarted: Boolean,
        isSectionComplete: Boolean,
        isPage1Complete: Boolean,
        isPage2Complete: Boolean,
        isPage3Complete: Boolean,
        isPage4Complete: Boolean,
        isPage5Complete: Boolean
    },
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