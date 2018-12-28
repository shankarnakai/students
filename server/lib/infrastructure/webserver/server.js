'use strict'

const express = require('express')
const bodyParser = require("body-parser")
const http = require("http")
const errorsHandlers = require('./errors')
const contextRequest = require('./middleware/context')
const cors = require('cors')

const createServer = async () => {
        const app = express()

        app.use(cors())
        app.use(contextRequest())

        app.use(
                bodyParser.urlencoded({
                        extended: false,
                        limit: "8mb"
                })
        )

        app.use(
                bodyParser.json({
                        limit: "4mb"
                })
        )

        app.use('/', require('./routes'))

        //Handler errors
        errorsHandlers(app)

        //Create HTTP server.
        const server = http.createServer(app)
        return server
}

module.exports = createServer
