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
                reqClass = {
                        ids = student.classes.map(item => item.id)
                }

                const classesList = await this.classRespository.findIDs(reqClass)
                const builder = R.pipe(createDictonaryClasses, buildClasses)

                return new StudentDetailResponse({
                        ...student,
                        classes: student.classes.map(builder(classesList))
                })
        }
};

const buildClasses = (dic) => (item) => {
        const name = dic[item.id]

        return {
                name: name,
                grade: item.grade
        }
}

const createDictonaryClasses = (classes) => classes.reduce((dic, item) => {
        dic[item.id] = item.name
        return dic
})
