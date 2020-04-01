class handleError extends Error {
    constructor(msg = 'Internal Server Error', status = 500) {
        super(msg);
        this.status = status;
    }

    toJSON() {
        return {
            status: this.status,
            message: this.msg
        }
    }
}

module.exports = handleError;