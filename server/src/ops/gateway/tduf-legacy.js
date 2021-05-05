/** TDUF legacy gateway - simple compatibility layer for TDUF CLI */

const path = require('path');
const childProcess = require('child_process');
const serverConfig = require('../../helpers/config').get();
const { info, error } = require('../../helpers/console');

function invoke(tool, commandArgs) {

    // Depend on OS (sh/cmd)
    const scriptExtension = process.platform === 'win32' ? 'cmd' : 'sh';
    const toolName = `${tool}.${scriptExtension}`;
    const tdufExecutable = path.resolve(serverConfig.tduf.path, toolName);
    const command = `${tdufExecutable} ${commandArgs}`;

    info('Attempting to start legacy tool', { tdufExecutable } );

    try {
        const out = childProcess.execSync(command, { cwd: serverConfig.tduf.path });
        
        const outAsString = out.toString();
        const jsonBeginIndex = outAsString.indexOf('{');
        const jsonEndIndex = outAsString.lastIndexOf('}') + 1;
        const json = outAsString.substring(jsonBeginIndex, jsonEndIndex);

        info('Command output', { json });

        return JSON.parse(json);
    } catch (err) {
        error('Could not run TDUF', { err });
        throw err;
    }
}

module.exports = {
    invoke,
};
