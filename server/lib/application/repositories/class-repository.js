'use strict';

//Class Repository Interface
module.exports = class {

        constructor() {}

        persist(classEntity) {
                // To be overridden in concrete implementation
        }

        getByID(id) {
                // To be overridden in concrete implementation
        }
};
