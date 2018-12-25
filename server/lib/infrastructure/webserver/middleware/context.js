const uuid = require("uuid");

// Run the context for each request. Assign a unique identifier to each request
const requestContext = (req, res, next) => {
        req.context = {
                id: uuid.v1()
        };
        next();
}
module.exports = () => {
        return requestContext
}
