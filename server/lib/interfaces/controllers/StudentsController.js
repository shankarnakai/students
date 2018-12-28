'use strict';
const { pick } = require('ramda')
const url = require('url');

const StudentsSearch = require('../../application/use-cases/StudentsSearch');
const StudentDetails = require('../../application/use-cases/StudentDetails');

const StudentsSearchSerializer = require('../serializers/StudentsSearchSerializer');
const StudentDetailsSerializer = require('../serializers/StudentDetailsSerializer');

const StudentRepositoryJSON = require('../storage/StudentRepositoryJSON');
const ClassRepositoryJSON = require('../storage/ClassRepositoryJSON');

module.exports = (DatabaseConnection) => {
        const studentRepository = new StudentRepositoryJSON(DatabaseConnection);
        const classRepository = new ClassRepositoryJSON(DatabaseConnection);

        const search = async (request) => {
                const studentSearchSerializer = new StudentsSearchSerializer();

                const _url = url.parse(request.url, true)
                const req = pick(['first', 'last', 'limit', 'skip'], _url.query)
                const useCase = new StudentsSearch(studentRepository)
                const students = await useCase.execute(req)
                return studentSearchSerializer.serialize(students, request.format)
        }

        const detail = async (request) => {
                const studentDetailSerializer = new StudentDetailsSerializer();

                const email = request.params.email
                const useCase = new StudentDetails(studentRepository, classRepository)
                const student = await useCase.execute({ email })
                return studentDetailSerializer.serialize(student, request.format)
        }

        return {
                search,
                detail
        }
};
