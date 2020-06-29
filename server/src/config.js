const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const appRootDir = require('app-root-dir').get();
const homeDir = require('os').homedir();

function get() {
    const refConfigFile = fs.readFileSync(path.join(appRootDir, 'config', 'tduf-next.server.config.yaml'), 'utf8');
    const refConfig = yaml.parse(refConfigFile);

    // Local config to be available: 
    // - development: in server/config directory
    // - production: in user home directory (not pkg snap)
    const localConfigPath = process.env.MODE_DEV ? path.join(appRootDir, 'config') : path.join(homeDir, '.tduf-next' );

    // TODO handle config file not found -> create it with default contents
    if (!fs.existsSync(localConfigPath)) {
        fs.mkdirSync(localConfigPath);
    }

    const localConfigFile = fs.readFileSync(path.join(localConfigPath, 'tduf-next.server.local.config.yaml'), 'utf-8');
    const localConfig = yaml.parse(localConfigFile);

    return {
        ...refConfig,
        ...localConfig,
    };
}

module.exports = {
    get,
};
