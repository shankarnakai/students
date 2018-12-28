'use strict';

const beautify = require('xml-beautifier')

const _serializeSingleStudent = (acc, student) => {
        return acc + `<student>
                        <first>${student.first}</first>
                        <last>${student.last}</last>
                        <email>${student.email}</email>
                        <gpa>${Number(student.gpa.toFixed(2))}</gpa>
                        <classes>
                                ${student.classes.reduce(_serializeSingleClass, "")}
                        </classes>
                      </student>`
}

const _serializeSingleClass = (acc, _class) => acc + `
        <class>
                <name>${_class.name}</name>
                <grade>${Number(_class.grade.toFixed(2))}</grade>
        </class>
`

module.exports = (data) => {
        if (!data) {
                throw new Error('Expect data to be not undefined nor null');
        }

        const header = '<?xml version="1.0" encoding="UTF-8"?>'
        return beautify(_serializeSingleStudent(header, data))
}
