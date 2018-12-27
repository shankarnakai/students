'use strict';

const ClassRepositoryJSON = require('./ClassRepositoryJSON')

const path = "./test/data/classes.json"
const R = require('ramda')

test("getByID", async () => {
        const rep = new ClassRepositoryJSON(path)
        const result = await rep.getByID(1)

        expect(result).not.toBeNull()
        expect(result.id).toBe(1)
        expect(result.name).toBe("Math 101")
})

test("getIDS", async () => {
        const rep = new ClassRepositoryJSON(path)
        const result = await rep.getIDS(["1", "2", "5"])

        expect(result).not.toBeNull()
        expect(result).toHaveLength(3)
})
