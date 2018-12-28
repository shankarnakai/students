'use strict';

const _serializeSingleStudent = (student) => {
        return {
                'first': student.first,
                'last': student.last,
                'email': student.email,
                'gpa': Number(student.gpa.toFixed(2)),
                'classes': student.classes.map(_serializeSingleClass),
        };
};

const _serializeSingleClass = (_class) => ({
        ..._class,
        grade: Number(_class.grade.toFixed(2))
})

module.exports = (data) => {
        if (!data) {
                throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
                return data.map(_serializeSingleStudent);
        }
        return _serializeSingleStudent(data);
}
