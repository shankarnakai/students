module.exports = class {
        constructor(lst) {
                if (!Array.isArray(lst) || lst.length == 0) {
                        return []
                }

                this.list = lst.map(buildStudentItem)
        }
}

const buildStudentItem = (item) => ({
        'first': item.firstName || "",
        'last': item.lastName || "",
        'email': item.email || "",
        'gpa': item.getAverageGrade() || 0
})
