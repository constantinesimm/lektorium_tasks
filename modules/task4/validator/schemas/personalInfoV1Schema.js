const innerArrayHobbiesSchema = {
    items: {
        name: {
            type: 'string'
        },
        timeStarted: {
            type: 'string'
        },
        isKeepOnDoing: {
            type: 'boolean'
        }
    }
};
const innerArrayCoursesSchema = {
    items: {
        name: {
            type: 'string'
        },
        timeStarted: {
            type: 'string'
        },
        timeEnd: {
            type: 'string'
        },
        isKeepOnDoing: {
            type: 'boolean'
        },
        doYouLikeIt: {
            type: 'boolean'
        }
    }
};
const innerArraySkillsSchema = {
    items: {
        name: {
            type: 'string'
        },
        level: {
            type: 'string'
        },
        improvements: {
            type: 'string'
        }
    }
};

const innerObjectPersonalInfoSchema = {
    properties: {
        username: {
            type: 'string'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        givenName: {
            type: 'string'
        },
        surname: {
            type: 'string'
        },
        gender: {
            type: 'string'
        },
        dob: {
            type: 'string'
        },
        nationality: {
            type: 'string'
        },
        phoneNumber: {
            type: 'string'
        },
        homeAddress: {
            type: 'string'
        },
        city: {
            type: 'string'
        },
        postCode: {
            type: 'string'
        },
        country: {
            type: 'string'
        },
        passportStatus: {
            type: 'string'
        },
        passportNumber:{
            type: 'string'
        },
        passportExpectedDate: {
            type: 'string'
        },
        passportExpiryDate: {
            type: 'string'
        },
        isSectionStarted: {
            type: 'boolean'
        },
        isSectionComplete: {
            type: 'boolean'
        },
        isPage1Complete: {
            type: 'boolean'
        },
        isPage2Complete: {
            type: 'boolean'
        },
        isPage3Complete: {
            type: 'boolean'
        },
        isPage4Complete: {
            type: 'boolean'
        },
        isPage5Complete: {
            type: 'boolean'
        }
    }
};
const innerObjectEvolutionSchema = {
    items: {
        hobbies: {
            type: 'array',
            items: [
                {
                    '$ref': innerArrayHobbiesSchema
                }
            ]
        },
        courses: {
            type: 'array',
            items: [
                {
                    '$ref': innerArrayCoursesSchema
                }
            ]
        },
        skills: {
            type: 'array',
            items: [
                {
                    '$ref': innerArraySkillsSchema
                }
            ]
        },
    },
    properties: {
        isSectionStarted: {
            type: 'boolean'
        },
        isSectionComplete: {
            type: 'boolean'
        },
        isPage1Complete: {
            type: 'boolean'
        },
        isPage2Complete: {
            type: 'boolean'
        },
        isPage3Complete: {
            type: 'boolean'
        }
    }
};

const  personalInfoV1Schema = {
    properties: {
        userNumb: {
            type: 'string'
        },
        personalInfo: innerObjectPersonalInfoSchema,
        evolution: innerObjectEvolutionSchema
    }
};

module.exports = personalInfoV1Schema;