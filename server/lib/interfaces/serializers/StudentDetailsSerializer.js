'use strict';
const StudentDetailsJsonSerializer = require('./students-details/StudentDetailsJsonSerializer')
const StudentDetailsXmlSerializer = require('./students-details/StudentDetailsXmlSerializer')

module.exports = class {
        serialize(data, format) {
                if (format == "xml") {
                        return StudentDetailsXmlSerializer(data)
                }

                return StudentDetailsJsonSerializer(data)
        }
};
