'use strict';

const student = require('../../domain/entities/student');
const studentRepository = require('../../application/repositories/studentRepository');

module.exports = class extends studentRepository {
        constructor() {
                super();
                this.data = {};
        }

        getByEmail(request) {
                const students = this._dataAsArray();
                return Promise.resolve(students.find(student => student.email === email));
        }

        find(request) {
                return Promise.resolve(this._dataAsArray());
        }

        //PRIVATE
        _dataAsArray() {
                return Object.keys(this.data).map(key => this.data[key]);
        }
};
