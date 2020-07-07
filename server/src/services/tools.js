/** Tools services */

const operations = require('../ops/operations');
const { traceCall } = require('./common');


const END_POINTS = {
    operation: '/tools/:category/:operation',
};

function init(app, serverConfig) {
    // Java fix
    const pathEnvDelimiter = process.platform === 'win32' ? ';' : ':';
    process.env.PATH = `${process.env.PATH}${pathEnvDelimiter}${serverConfig.java.jrePath}`;

    // Debug
    app.get(END_POINTS.operation, (req, res) => {
        traceCall(req);

        const { params: { category, operation} } = req;
        res.send(`${category} - ${operation}`);
    });

    // Execute operation
    app.post(END_POINTS.operation, (req, res) => {
        traceCall(req);

        res.contentType('application/json');

        const {  params: { category, operation }, body } = req;
        if (!operations[category] || !operations[category][operation]) {
            res.statusCode = 404;
            res.send({
                errors: [
                    `Category - Operation combination not found: ${category} - ${operation}`,
                ],
            });
        } else {
            try {
                const op = operations[category][operation];
                const result = op(body.args);

                res.statusCode = 200;
                res.send({
                    result,
                    errors: [],
                });

            } catch (error) {
                res.statusCode = 400;
                res.send({
                    errors: [error.stderr.toString()],
                });
            }
        }
    });
}

module.exports = init;

