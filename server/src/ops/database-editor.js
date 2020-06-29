/** TDUF database editor executable */

const { invoke } = require('./gateway/tduf-legacy');

function start(args) {
    const { switches } = args;

    return invoke('DatabaseEditor', switches);
}

module.exports = {
    start,
}
