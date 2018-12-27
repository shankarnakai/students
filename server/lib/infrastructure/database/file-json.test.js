const Datastore = require('./file-json')

test('Connecting with fail', () => {
        expect(() => {
                Datastore('./test/data/NON_EXIST_FILE.json')
        }).toThrow();
})

test('getByKey', async () => {
        const conn = Datastore('./test/data/file.json')
        const result = await conn.getByKey('dictionary', 'key')
        expect(result).toEqual("Value 1")
})

describe('Select actions', () => {
        const conn = Datastore('./test/data/file.json')

        it('selectOne without filter', async () => {
                const result = await conn.selectOne('table')
                const expected = {
                        "id": 1,
                        "name": "Math 101"
                }
                expect(result).toEqual(expected)
        })

        it('selectOne with Filter', async () => {
                const result = await conn.selectOne('table', item => item.id == 2)
                const expected = {
                        "id": 2,
                        "name": "English 101"
                }
                expect(result).toEqual(expected)
        })

        it('selectAll without filter', async () => {
                const result = await conn.selectAll('table')
                const expected = [{
                        "id": 1,
                        "name": "Math 101"
                }, {
                        "id": 2,
                        "name": "English 101"
                }]
                expect(result).toHaveLength(expected.length)
                expect(result).toEqual(expected)
        })

        it('selectAll with filter', async () => {
                const result = await conn.selectAll('table', item => item.id == 2)
                const expected = [{
                        "id": 2,
                        "name": "English 101"
                }]
                expect(result).toEqual(expected)
        })

        it('selectAll with limit', async () => {
                const result = await conn.selectAll('table', null, 1, 0)
                const expected = [{
                        "id": 1,
                        "name": "Math 101"
                }]
                expect(result).toEqual(expected)
        })

        it('selectAll with skip', async () => {
                const result = await conn.selectAll('table', null, 0, 1)
                const expected = [{
                        "id": 2,
                        "name": "English 101"
                }]
                expect(result).toEqual(expected)
        })

});
