'use strict';
const StudentsSearchJsonSerializer = require('./students-search/StudentsSearchJsonSerializer')
const StudentsSearchXmlSerializer = require('./students-search/StudentsSearchXmlSerializer')

module.exports = class {
        serialize(data, format) {
                if (format == "xml") {
                        return StudentsSearchXmlSerializer(data)
                }

                return StudentsSearchJsonSerializer(data)
        }
};
