'use strict';

const R = require('ramda')

const ClassEntity = require('../../domain/entities/Class');
const ClassRepository = require('../../application/repositories/ClassRepository');
const FileJSON = require('../../infrastructure/database/file-json');


const collectionName = "classes"

module.exports = class extends ClassRepository {
        constructor(database) {
                super();
                this.db = database 
        }

        async getByID(id) {
                const className = await this.db.getByKey(collectionName, id)
                if (!className) {
                        return null
                }
                return formatResult([id, className])
        }

        async getIDS(ids) {
                const lookup = ids.map(id => this.db.getByKey(collectionName, id))
                const names = R.flatten(await Promise.all(lookup))
                const tupleIDName = R.zipWith((x, y) => [x, y], ids, names)
                return tupleIDName.map(formatResult)
        }
};

function formatResult(item) {
        return new ClassEntity(item[0], item[1])
}
