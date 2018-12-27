const express = require("express");

//Controllers
const NewStudentsCtrl = require('../../../interfaces/controllers/students-controller')
const Controller = NewStudentsCtrl()

const router = express.Router();

const handler = (ctrlFunc) => async (req, res) => {
        const data = await ctrlFunc(req)
        res.send(data)
        return
}

router.get("/students", handler(Controller.search)) 
router.get("/students/:email", handler(Controller.detail)) 

module.exports = router
