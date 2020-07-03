/** Common ESLINT configuration **/

module.exports = {
    env: {
        'jest/globals': true,
    },
    extends: [
        "eslint:recommended",
        "plugin:jest/recommended",
    ],
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    plugins: [ 'jest' ],
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        semi: ['error', 'always'],
    },
};
