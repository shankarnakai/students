const StudentRepositoryJSON = require('./StudentRepositoryJSON')
const FileJSON = require('../../infrastructure/database/file-json')

const path = "./test/data/students.json"
const R = require('ramda')

describe("StudentRepositorySJSON", () => {
        const repo = new StudentRepositoryJSON(FileJSON(path))

        test("getByEmail", async () => {
                const email = 'jim-johnson@mailinator.com'

                const result = await repo.getByEmail({
                        email
                })

                expect(result).not.toBeNull()
                expect(result.email).toBe(email)
                expect(result.firstName).toBe("Jim")
                expect(result.lastName).toBe("Johnson")
                expect(result.classes).toHaveLength(3)
        })

        describe("find", () => {
                test("Find All", async () => {
                        const result = await repo.find()
                        expect(result).not.toBeNull()
                        expect(result).toHaveLength(3)
                })

                test("Find by First Name", async () => {
                        const result = await repo.find({
                                firstName: "Jane"
                        })
                        expect(result).not.toBeNull()
                        expect(result).toHaveLength(1)

                        expect(result[0].firstName).toBe("Jane")
                        expect(result[0].lastName).toBe("Smith")
                })

                test("Find by Last Name", async () => {
                        const result = await repo.find({
                                lastName: "Smith"
                        })
                        expect(result).not.toBeNull()
                        expect(result).toHaveLength(2)

                        const firstNames = R.uniq(result.map(item => item.firstName))
                        expect(firstNames).toHaveLength(2)
                        expect(firstNames).toContain("Jane")
                        expect(firstNames).toContain("John")

                        const lastNames = R.uniq(result.map(item => item.lastName))
                        expect(lastNames).toHaveLength(1)
                        expect(lastNames[0]).toBe("Smith")
                })

                test("Find by First/Last Name", async () => {
                        const result = await repo.find({
                                firstName: "John", 
                                lastName: "Smith"
                        })
                        expect(result).not.toBeNull()
                        expect(result).toHaveLength(1)

                        expect(result[0].firstName).toBe("John")
                        expect(result[0].lastName).toBe("Smith")
                })
        })
})
