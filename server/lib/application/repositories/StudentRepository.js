'use strict';

//Interface Definition
module.exports = class {

        constructor() {}

        getByEmail(email) {
                // To be overridden in concrete implementation
                return Promise.resolve()
        }

        find(fields) {
                // To be overridden in concrete implementation
                return Promise.resolve()
        }
};
