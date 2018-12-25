'use strict';

const fs = require("fs");
const express = require("express");

const router = express.Router();

//Routes
router.get("/students", require('./students'))

module.exports = router;
