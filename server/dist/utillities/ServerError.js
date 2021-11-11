class ServerError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
module.exports = ServerError;
//# sourceMappingURL=ServerError.js.map