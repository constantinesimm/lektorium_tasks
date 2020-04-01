const personalInfoV2Schema = {
    type: 'object',
    properties: {
        username: {
            type: 'string'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        }
    }
};

module.exports = personalInfoV2Schema;