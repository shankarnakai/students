'use strict';

const _serializeSingleStudent = (studend) => {
  return {
    'first': studend.firstName,
    'last': studend.lastName,
    'email': studend.email,
    'gpa': studend.gpa,
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleStudent);
    }
    return _serializeSingleStudent(data);
  }
};
