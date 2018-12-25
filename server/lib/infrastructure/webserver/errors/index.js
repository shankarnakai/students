const ErrorsController = require('../../../interfaces/controllers/errors-controller')

module.exports = (app) => {
        app.use(ErrorsController.NOT_IMPLEMENTED)
        app.use(ErrorsController.BAD_REQUEST)
        app.use(ErrorsController.UNEXPECTED)
        app.use(ErrorsController.NOT_FOUND)
}
