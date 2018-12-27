'use strict';

const R = require('ramda')
const fs = require('fs');
const util = require('util')
const pathResolve = require('path').resolve

function connection(path) {
        const conn = getFileData(path)

        return {
                selectAll: selectAll(conn),
                selectOne: selectOne(conn),
                getByKey: getByKey(conn)
        }
}

function getFileData(path) {
        if (!path) {
                throw new Error('Datastore path is required')
        }

        if (!fs.existsSync(path)) {
                const absPath = pathResolve(path)
                throw new Error(util.format('Datastore %s not found', absPath))
        }

        return () => new Promise((resolve, reject) => {
                fs.readFile(path, 'utf8', function(err, content) {
                        if (err) {
                                return reject(err);
                        }
                        const data = JSON.parse(content)
                        resolve(data);
                });
        })
}

function getCollection(collectionName, data) {
        if (!data.hasOwnProperty(collectionName)) {
                throw new Error(util.format("Collection %s not found", collectionName))
        }
        return data[collectionName]
}

const selectAll = (conn) => async (collectionName, query, limit, skip) => {
        const datastore = await conn()
        const data = getCollection(collectionName, datastore)

        query = query || (data => true)
        skip = skip || 0
        limit = limit || data.length

        let result = []
        let found = 0
        let i = 0
        let skipped = 0

        while (found < limit && i < data.length) {
                const item = data[i]
                i += 1
                if (query(item)) {
                        if (skipped < skip) {
                                skipped += 1
                                continue
                        }

                        result.push(item)
                        found += 1
                }
        }

        return result
}

const selectOne = (conn) => async (collectionName, query) => {
        const data = await selectAll(conn)(collectionName, query)
        if (data.length == 0) return null
        return data[0]
}

const getByKey = (conn) => async (collectionName, key) => {
        const datastore = await conn()
        const data = getCollection(collectionName, datastore)
        if (!data.hasOwnProperty(key)) {
                return null
        }
        return data[key]
}


module.exports = connection
