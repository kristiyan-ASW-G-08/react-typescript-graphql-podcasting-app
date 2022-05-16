require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules', 'src', 'types'],
  clearMocks: true,
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    'models/(.*)$': '<rootDir>/src/models/$1',
    'customTypes/(.*)$': '<rootDir>/src/types/$1',
    'services/(.*)$': '<rootDir>/src/services/$1',
    'customUtilities/(.*)$': '<rootDir>/src/utilities/$1',
    'dtos/(.*)$': '<rootDir>/src/dtos/$1',
    'typeDefs/(.*)$': '<rootDir>/src/typeDefs/$1',
    'resolvers/(.*)$': '<rootDir>/src/resolvers/$1',
    'users/(.*)$': '<rootDir>/src/users/$1',
    'podcasts/(.*)$': '<rootDir>/src/podcasts/$1',
    'episodes/(.*)$': '<rootDir>/src/episodes/$1',
  },
};
