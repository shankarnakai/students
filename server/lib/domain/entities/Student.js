'use strict';

module.exports = class {
        constructor(email, firstName, lastName, grade) {
                this.email = email;
                this.firstName = firstName;
                this.lastName = lastName;
                this.grade = grade;
        }

        getAverageGrage() {
                const len = this.grade.length 
                if(len == 0) {
                        return 0
                }

                const total = this.grade.reduce((total, item) => total + item.grade)
                return total/len
        }
};
