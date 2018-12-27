module.exports = class {
        constructor(data) {
                this.email = data.email
                this.first = data.firstName
                this.last = data.lastName
                this.gpa = data.gpa
                this.classes = data.classes.map(buildStudentClasses)
        }
}

const buildStudentClasses = (item) => {
        return Object.assign(DefaultStudentClass(), item)
}

const DefaultStudentClass = () => {
        return {
                name: "",
                grade: 0,
        }
}
