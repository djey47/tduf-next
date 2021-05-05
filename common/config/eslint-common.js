/** Common ESLINT configuration **/

module.exports = {
    env: {
        'jest/globals': true,
        node: true,
        es6: true,
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
        'no-console': 'warn',
        semi: ['error', 'always'],
    },
};
