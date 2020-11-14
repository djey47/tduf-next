const fs = require("fs");
const YAML = require('yaml');
const Path = require('path');
const appRootDir = require('app-root-dir').get();
const deepMerge = require('deepmerge');

/**
 * 
 */
function load() {
    const rootConfig = loadSingle('parser-config-root.yaml');
    const customConfig = loadSingle('parser-config.yaml');
    return deepMerge(rootConfig, customConfig);
}

function loadSingle(configFileName) {
    const configFilePath = Path.join(appRootDir, 'config', configFileName);
    if (fs.existsSync(configFilePath)) {
        const configString = fs.readFileSync(configFilePath, "utf8");
        // console.log({ configString });
        return YAML.parse(configString); 
    } 

    console.error("No config file found!", { configFilePath });
    return {}; 
}

module.exports = {
    load,
};
