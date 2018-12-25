'use strict';

const ClassEntity = require('../../domain/entities/class');
const ClassRepository = require('../../application/repositories/classRepository');

module.exports = class extends ClassRepository {
        constructor() {
                super();
                this.data = {};
        }

        getByID(id) {
                const classes = this._dataAsArray();
                return Promise.resolve(classes.find(item => item.id === id));
        }

        //PRIVATE
        _dataAsArray() {
                return Object.keys(this.data).map(key => this.data[key]);
        }
};
