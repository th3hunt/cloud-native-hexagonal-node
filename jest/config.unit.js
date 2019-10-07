module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['**/src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '__tests__', '/dist/'],
  coverageReporters: ['text', 'html'],
  coverageDirectory: '<rootDir>/reports/unit/coverage',
  moduleFileExtensions: ['js', 'json'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Unit tests report',
        outputPath: './reports/unit/index.html'
      }
    ]
  ],
  rootDir: '../',
  silent: true,
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.unit.js?(x)']
};
