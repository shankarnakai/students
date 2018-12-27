'use strict';
const { pick } = require('ramda')

const StudentsSearch = require('../../application/use-cases/StudentsSearch');
const StudentDetails = require('../../application/use-cases/StudentDetails');
const StudentSerializer = require('../serializers/students-serializer');

const StudentRepositoryJSON = require('../storage/StudentRepositoryJSON');
const ClassRepositoryJSON = require('../storage/ClassRepositoryJSON');

module.exports = () => {
        const studendSerializer = new StudentSerializer();
        const studendRepository = new StudentRepositoryJSON('../../../../data/');
        const classRepository = new ClassRepositoryJSON();

        const search = async (request) => {
                const req = pick(['first', 'last', 'limit', 'skip'], request.params)
                const useCase = new StudentsSearch(studendRepository)
                const studends = await useCase.execute(req)
                return studends.map(studendSerializer.serialize)
        }

        const detail = async (request) => {
                const email = request.params.email
                const useCase = new StudentDetail(studendRepository, classRepository)
                const student = await useCase.execute({ email })
                return this.studendSerializer.serialize(studend)
        }

        return  {
                search,
                detail
        }
};
