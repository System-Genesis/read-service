module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
    collectCoverage: true,
    testMatch: ['**/**/*.spec.(ts)'],
};
