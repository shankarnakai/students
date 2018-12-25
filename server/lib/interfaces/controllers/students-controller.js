'use strict';

const StudentSerializer = require('../serializers/StudentSerializer');
const ListStudents = require('../../application/use_cases/ListStudents');
const CreateStudent = require('../../application/use_cases/CreateStudent');
const GetStudent = require('../../application/use_cases/GetStudent');
const DeleteStudent = require('../../application/use_cases/DeleteStudent');
const StudentRepositoryJSON = require('../storage/StudentRepositoryJSON');

module.exports = class {

  constructor() {
    this.studendSerializer = new StudentSerializer();
    this.studendRepository = new StudentRepositoryJSON();
  }

  search() {
    const useCase = new ListStudents(this.studendRepository);
    return useCase.execute()
      .then(studends => studends.map(this.studendSerializer.serialize));
  }

  detail(request) {
    const email = request.params.email;
    const useCase = new StudentSearch(this.studendRepository);
    return useCase.execute(email)
      .then(studend => this.studendSerializer.serialize(studend));
  }

};
