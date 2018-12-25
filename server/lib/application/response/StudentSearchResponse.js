module.exports = class {
        constructor(lst) {
                if (!Array.isArray(lst) || lst.length == 0) {
                        return []
                }

                this.lista = data.map(buildStudentItem)
        }
}

const buidStudentItem = (item) => {
        return {
                'first': item.firstName || "",
                'last': item.lastName || "",
                'email': item.email || "",
                'gpa': item.getAverageGrade() || 0
        }
}
