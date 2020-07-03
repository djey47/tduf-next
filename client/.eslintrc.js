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
        "plugin:vue/recommended",
    ],
    parserOptions: {
        ecmaFeatures: {
            ...commonEcmaFeatures,
        },
    },
    plugins: [
        ...commonPlugins,
        'vue',
    ],
    env: {
        ...commonEnv,
        node: true,
    },
    rules: {
        ...commonRules,
    },
};
