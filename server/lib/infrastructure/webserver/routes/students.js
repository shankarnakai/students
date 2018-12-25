const express = require("express");

//Controllers
//const StudentsCtrl = require('../../../interfaces/controllers/students-controller')
const router = express.Router();

//students handlers
//router.get("/students", StudentsCtrl.searchStudents);
//router.get("/students/:email", StudentsCtrl.detailStudents);

const { NotImplementedError } = require("../../../application/errors");

router.get("/students", (req, res) => {
        throw new NotImplementedError("NOT IMPLEMENTED");
});

router.get("/students/:email", () => {
        throw new NotImplementedError();
});

module.exports = router
