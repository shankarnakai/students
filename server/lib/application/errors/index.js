const util = require("util");

class AbstractError extends Error {
    constructor(...args) {
        let message = util.format.apply(util, args);
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
    }
}

class NotFoundError extends AbstractError {}
class BadRequestError extends AbstractError {}
class NotImplementedError extends AbstractError {}
class UnexpectedError extends AbstractError {}

module.exports = {
    BadRequestError,
    NotFoundError,
    NotImplementedError,
    UnexpectedError
}
