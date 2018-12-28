const express = require("express");

//Datastore
const DatabaseJSON = require('../../database/file-json')
const Config = require('../../configuration')

//Controllers
const NewStudentsCtrl = require('../../../interfaces/controllers/students-controller')
const Controller = NewStudentsCtrl(DatabaseJSON(Config.database.path))

const router = express.Router();

const handler = (ctrlFunc) => async (req, res) => {
        const data = await ctrlFunc(req)
        res.send(data)
        return
}

router.get("/students", handler(Controller.search)) 
router.get("/students/:email", handler(Controller.detail)) 

module.exports = router
