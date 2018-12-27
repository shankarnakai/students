'use strict';

module.exports = class {
        constructor(email, firstName, lastName, classes) {
                this.email = email;
                this.firstName = firstName;
                this.lastName = lastName;
                this.classes = classes;
        }

        getAverageGrade() {
                const len = this.classes.length 
                if(len == 0) {
                        return 0
                }

                const total = this.classes.reduce((total, item) => total + item.grade, 0)
                return total/len
        }
};
