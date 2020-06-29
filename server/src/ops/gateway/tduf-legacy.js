/** TDUF legacy gateway - simple compatibility layer for TDUF CLI */

const path = require('path');
const childProcess = require('child_process');
const serverConfig = require('../../config').get();

function invoke(tool, commandArgs) {

    // Depend on OS (sh/cmd)
    // TODO Windows support
    const scriptExtension = 'sh';
    const toolName = `${tool}.${scriptExtension}`;
    const tdufExecutable = path.resolve(serverConfig.tduf.path, toolName);
    const command = `${tdufExecutable} ${commandArgs}`;

    console.info('ℹ️ Attempting to start legacy tool', { tdufExecutable } );

    try {
        const out = childProcess.execSync(command, { cwd: serverConfig.tduf.path });
        
        const outAsString = out.toString();
        const jsonBeginIndex = outAsString.indexOf('{');
        const jsonEndIndex = outAsString.lastIndexOf('}') + 1;
        const json = outAsString.substring(jsonBeginIndex, jsonEndIndex);

        console.log('ℹ️ Command output', { json });

        return JSON.parse(json);
    } catch (err) {
        console.error('✘ Could not run TDUF', { err });
        throw err;
    }
}

module.exports = {
    invoke,
};
