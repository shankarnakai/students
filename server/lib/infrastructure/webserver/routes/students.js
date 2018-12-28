const express = require("express");

//Datastore
const DatabaseJSON = require('../../database/file-json')
const Config = require('../../configuration')

//Controllers
const NewStudentsCtrl = require('../../../interfaces/controllers/StudentsController')
const Controller = NewStudentsCtrl(DatabaseJSON(Config.database.path))

const router = express.Router();

const handler = (ctrlFunc) => async (req, res) => {
        var accept = req.headers['accept'];
        req.format = 'json'
        if (accept && accept.indexOf('application/xml') !== -1) {
                req.format = 'xml'
        }

        const data = await ctrlFunc(req)
        res.send(data)
        return
}

router.get("/", handler(Controller.search))
router.get("/:email", handler(Controller.detail))

module.exports = router
