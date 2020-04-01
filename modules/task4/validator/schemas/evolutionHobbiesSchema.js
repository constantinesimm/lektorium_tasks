const innerArrayHobbiesSchema = {
    type: 'object',
    properties: {
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

const evolutionHobbiesSchema = {
    properties: {
        hobbies: {
            type: 'array',
            items: [
                {
                    '$ref': innerArrayHobbiesSchema
                }
             ]
        }
    }
};

module.exports = evolutionHobbiesSchema;