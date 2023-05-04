module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    transform: {
        "\\.yaml$": 'yaml-jest',
    },
    // Let babel transpile node_modules (required for vue-spinner)
    transformIgnorePatterns: [],
};
