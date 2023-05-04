/** file operations */

const { invoke } = require('./gateway/tduf-legacy');

function bankinfo(args) {
    const { input } = args;

    const commandArgs = `bankinfo -i ${input} -n`;

    return invoke('FileTool', commandArgs);
}

module.exports = {
    bankinfo,
};
