module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    transform: {
        "\\.yaml$": 'yaml-jest',
    },
};
