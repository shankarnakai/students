'use strict';

const {
    BadRequestError,
    NotFoundError,
    NotImplementedError,
    UnexpectedError
} = require("../../application/errors");

function BAD_REQUEST(error, _req, res, next) {
    if (error instanceof BadRequestError) {
        console.error(error.stack);
        return res.status(400).send({ error: error.message });
    }

    next(error);
}

function NOT_IMPLEMENTED(error, _req, res, next) {
    if (error instanceof NotImplementedError) {
        return res.status(400).send({ error: error.message });
    }

    next(error);
}

function UNEXPECTED(error, _req, res, next) {
    if (error instanceof UnexpectedError) {
        console.error(error.stack);
        return res.status(500).send({ error: error.message });
    }

    next(error);
}

function NOT_FOUND(error, _req, res, next) {
    if (error instanceof NotFoundError) {
        return res.status(404).send({ error: error.message });
    }

    console.error(error.stack);
    return res.status(500).send({ error: error.message });
}

module.exports = {
    BAD_REQUEST,
    NOT_FOUND,
    NOT_IMPLEMENTED,
    UNEXPECTED
};
