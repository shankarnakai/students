'use strict';

const StudentSearchResponse = require('../responses/StudentSearchResponse.js')

module.exports = class {
        constructor(studentRepository) {
                this.studentRepository = studentRepository;
        }

        async execute(request) {
                const lst = await this.studentRepository.find(request);
                return new StudentSearchResponse(lst)
        }
};
