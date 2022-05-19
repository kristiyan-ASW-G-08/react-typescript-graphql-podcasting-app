// jest.config.js
module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/mocks/fileMock.js',
    '^.+\\.scss$': 'identity-obj-proxy',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/assets/(.*)$': '<rootDir>/assets/$1',
    '^@/middleware/(.*)$': '<rootDir>/middleware/$1',
    '^@/utilities/(.*)$': '<rootDir>/utilities/$1',
    '^@/validationSchemas/(.*)$': '<rootDir>/validationSchemas/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/queries/(.*)$': '<rootDir>/queries/$1',
    '^@/context/(.*)$': '<rootDir>/context/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^pages/(.*)$': '<rootDir>/pages/$1',
    '^styles/(.*)$': '<rootDir>/styles/$1',
    '^assets/(.*)$': '<rootDir>/assets/$1',
    '^middleware/(.*)$': '<rootDir>/middleware/$1',
    '^utilities/(.*)$': '<rootDir>/utilities/$1',
    '^validationSchemas/(.*)$': '<rootDir>/validationSchemas/$1',
    '^types/(.*)$': '<rootDir>/types/$1',
    '^queries/(.*)$': '<rootDir>/queries/$1',
    '^context/(.*)$': '<rootDir>/context/$1',
  },
};
