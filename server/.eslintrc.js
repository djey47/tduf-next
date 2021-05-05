const {
    env: commonEnv,
    extends: commonExtends,
    parserOptions: { ecmaFeatures: commonEcmaFeatures },    
    plugins: commonPlugins,
    rules: commonRules,
} = require('../common/config/eslint-common');

module.exports = {
    extends: [
        ...commonExtends,
        'plugin:node/recommended',
    ],
    plugins: [ ...commonPlugins ],
    parserOptions: {
        ecmaVersion: 2017,
        ecmaFeatures: { 
            ...commonEcmaFeatures
        },
    },
    env: {
        ...commonEnv,
    },
    "rules": {
        ...commonRules,
        "node/no-unpublished-require": "off",
    },
};
