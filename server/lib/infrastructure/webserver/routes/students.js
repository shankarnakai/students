const express = require("express");

//Datastore
const DatabaseJSON = require('../../database/file-json')
const Config = require('../../configuration')

//Controllers
const NewStudentsCtrl = require('../../../interfaces/controllers/StudentsController')
const Controller = NewStudentsCtrl(DatabaseJSON(Config.database.path))

const router = express.Router();

const handler = (ctrlFunc) => async (req, res) => {
        var content_type = req.headers['content-type'];
        req.format = 'json'
        if (content_type && content_type.indexOf('application/xml') !== 0) {
                req.format = 'xml'
        }

        const data = await ctrlFunc(req)
        res.send(data)
        return
}

router.get("/", handler(Controller.search))
router.get("/:email", handler(Controller.detail))

module.exports = router
