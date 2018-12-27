'use strict';

const Student = require('../../domain/entities/Student');

const StudentRepository = require('../repositories/StudentRepository');
const MockStudentRepository = class extends StudentRepository {};
const mockStudentRepository = new MockStudentRepository();

const StudentSearch = require('./StudentsSearch')
const useCase = new StudentSearch(mockStudentRepository);

const StudentSearchResponse = require('../responses/StudentSearchResponse')

const sum = lst => lst.reduce((acc, i) => acc + i, 0)

test('Find Students by first name', async () => {
        let expected = new StudentSearchResponse()
        expected.list = [{
                'first': "John",
                'last': "Smith",
                'email': "johnsmith@mailinator.com",
                'gpa': sum([4 + 3]) / 2
        }]

        // given
        const studentItem = new Student("johnsmith@mailinator.com", "John", "Smith", [{
                "id": 1,
                "grade": 4
        }, {
                "id": 2,
                "grade": 3
        }])

        mockStudentRepository.find = jest.fn((req) => Promise.resolve([studentItem]))

        // when
        const result = await useCase.execute({
                'firstName': 'John',
                limit: 0,
                skip: 0
        })

        // then
        expect(mockStudentRepository.find).toHaveBeenCalledWith({
                'firstName': 'John',
                'limit': 0,
                'skip': 0
        })

        expect(result.list).toEqual(expected.list);
})
