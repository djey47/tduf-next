/** Core services */

const { info } = require('../helpers/console');
const { traceCall } = require('./common');

const END_POINTS = {
    configuration: '/config',
    stop: '/stop',
};

function init(app, serverConfig) {
    app.get(END_POINTS.configuration, (req, res) => {
        traceCall(req);

        res.contentType('application/json');

        res.send(serverConfig);
    });

    app.post(END_POINTS.stop, (req) => {
        traceCall(req);

        info(':skull_and_crossbones:  Graceful server termination requested!');
        // eslint-disable-next-line no-process-exit
        process.exit(0);
    });
}

module.exports = init;
