'use strict';

const StudentSearchResponse = require('../responses/StudentSearchResponse.js')

module.exports = class {
        constructor(userRepository) {
                this.userRepository = userRepository;
        }

        async execute(request) {
                const lst = await this.userRepository.find(request);
                return new StudentSearchResponse(lst)
        }
};
