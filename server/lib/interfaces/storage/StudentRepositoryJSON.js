'use strict';

const Student = require('../../domain/entities/Student');
const FileJSON = require('../../infrastructure/database/file-json');
const StudentRepository = require('../../application/repositories/StudentRepository');

const collectionName = "students"

module.exports = class extends StudentRepository {
        constructor(database) {
                super();
                this.db = database; 
        }

        async getByEmail(req) {
                const student = await this.db.selectOne(collectionName, filterByEmail(req.email))
                return formatResult(student)
        }

        async find(req) {
                if (!req) {
                        return this.db.selectAll(collectionName)
                }
                const filter = createFilterStudent(req.first, req.last)
                const results = await this.db.selectAll(collectionName, filter, req.limit, req.skip)
                return results.map(formatResult)
        }
};

function wordBeginWith(word, str) {
        const regexp = new RegExp("^" + str.toLowerCase());
        return regexp.test(word.toLowerCase())
} 

function formatResult(item) {
        return new Student(item.email, item.first, item.last, item.studentClasses)
}

const filterByEmail = (email) => (student) => {
        return email.toLowerCase() === student.email.toLowerCase()
}

const filterByFirstName = (first) => (student) => {
        return wordBeginWith(student.first, first)
}

const filterByLastName = (last) => (student) => {
        return  wordBeginWith(student.last, last)
}

const filterByFullName = (first, last) => (student) => {
        return filterByFirstName(first)(student) && filterByLastName(last)(student)
}

const createFilterStudent = (first, last) => {
        if (first && last) {
                return filterByFullName(first, last)
        }

        if (first) {
                return filterByFirstName(first)
        }

        if (last) {
                return filterByLastName(last)
        }

        return null
}
