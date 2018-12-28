'use strict';

const _serializeSingleStudent = (student) => {
        return {
                'first': student.first,
                'last': student.last,
                'email': student.email,
                'gpa': Number(student.gpa.toFixed(2)),
        };
};

module.exports = (data) => {
        if (!data || !data.list) {
                return []
        }
        return data.list.map(_serializeSingleStudent);
}
