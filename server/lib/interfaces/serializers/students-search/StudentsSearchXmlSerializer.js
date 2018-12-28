'use strict';

const beautify = require('xml-beautifier')

const _serializeSingleStudent = (acc, student) => {
        return acc + `<student>
                        <first>${student.first}</first>
                        <last>${student.last}</last>
                        <email>${student.email}</email>
                        <gpa>${Number(student.gpa.toFixed(2))}</gpa>
                      </student>`
};

module.exports = (data) => {
        if (!data) {
                throw new Error('Expect data to be not undefined nor null');
        }

        const header = '<?xml version="1.0" encoding="UTF-8"?>'
        return beautify(`${header}
                        <students>
                                 ${data.list.reduce(_serializeSingleStudent, "")}
                        </students>`)
}
