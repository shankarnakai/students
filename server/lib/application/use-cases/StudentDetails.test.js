'use strict';

const Student = require('../../domain/entities/Student');
const Class = require('../../domain/entities/Class');

const StudentRepository = require('../repositories/StudentRepository');
const MockStudentRepository = class extends StudentRepository {};
const mockStudentRepository = new MockStudentRepository();

const ClassRepository = require('../repositories/ClassRepository');
const MockClassRepository = class extends ClassRepository {};
const mockClassRepository = new MockClassRepository();

const StudentDetails = require('./StudentDetails')
const useCase = new StudentDetails(mockStudentRepository, mockClassRepository);

const StudentDetailResponse = require('../responses/StudentDetailResponse')

const sum = lst => lst.reduce((acc, i) => acc + i, 0)

test('Find Students by first name', async () => {
        const expected = {
                'first': "John",
                'last': "Smith",
                'email': "johnsmith@mailinator.com",
                'gpa': sum([4 + 3]) / 2,
                'classes': [{
                        "name": "Math 101",
                        "grade": 4
                }, {
                        "name": "English 101",
                        "grade": 3
                }]
        }

        // given
        const studentItem = new Student("johnsmith@mailinator.com", "John", "Smith", [{
                "id": 1,
                "grade": 4
        }, {
                "id": 2,
                "grade": 3
        }])

        const classList = [
                new Class(1, "Math 101"),
                new Class(2, "English 101"),
        ]

        mockStudentRepository.getByEmail = jest.fn((req) => Promise.resolve(studentItem))
        mockClassRepository.getIDS = jest.fn((req) => Promise.resolve(classList))

        // when
        const result = await useCase.execute({ email: "johnsmith@mailinator.com" })

        // then
        expect(mockStudentRepository.getByEmail).toHaveBeenCalledWith({ email: "johnsmith@mailinator.com" })
        expect(mockClassRepository.getIDS).toHaveBeenCalledWith([1, 2])

        expect(result).toEqual(expected);
})
