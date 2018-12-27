'use strict';

const R = require('ramda')
const StudentDetailResponse = require('../responses/StudentDetailResponse.js')

module.exports = class {
        constructor(studentRepository, classRespository) {
                this.studentRepository = studentRepository
                this.classRespository = classRespository
        }

        async execute(request) {
                const student = await this.studentRepository.getByEmail(request)
                if(!student) {
                        return null 
                }
                console.log(student)
                const ids = student.classes.map(item => item.id)

                const classesList = await this.classRespository.getIDS(ids)
                const builder = R.pipe(createDictonaryClasses, buildClasses)

                return new StudentDetailResponse({
                        ...student,
                        gpa: student.getAverageGrade(),
                        classes: student.classes.map(builder(classesList))
                })
        }
};

const buildClasses = (dic) => (item) => {
        const name = dic[item.id]
        console.log(item.id)

        return {
                name: name,
                grade: item.grade
        }
}

const createDictonaryClasses = (classes) => classes.reduce((dic, item) => {
        dic[item.id] = item.name
        return dic
}, {})
