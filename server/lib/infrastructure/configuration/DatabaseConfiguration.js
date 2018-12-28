const default_path = "../../../data/students_classes"

module.exports = {
        path: process.env.DATASTORE_FILE_JSON || default_path
}
