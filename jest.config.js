module.exports = {
    preset: 'ts-jest',                      // Use the TypeScript preprocessor.
    testEnvironment: 'node',                // Use the Node.js environment.
    testMatch: ['<rootDir>/**/*.test.ts'],  // Look for test files with the .test.ts extension.
    verbose: true,                          // Display individual test results with the test name and status.
    forceExit: true,                        // Force Jest to exit after all tests have completed.
    clearMocks: true,                       // Clear mock calls and instances between tests.
    setupFiles: ['<rootDir>/jest.setup.js'], // Run the setup file before running the tests.
}