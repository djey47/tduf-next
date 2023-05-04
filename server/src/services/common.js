/** Common configuration for services */

const bodyParser = require('body-parser');
const cors = require('cors');
const { info } = require('../helpers/console');

function init(app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
}

function traceCall(req) {
    const { path, params, body } = req;
    info(':dark_sunglasses:  Call with', { path, params, body });
}

module.exports = {
    init,
    traceCall,
};
