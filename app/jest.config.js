/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const TsConfigPath = path.resolve(__dirname, 'tsconfig.json')

module.exports = {
  rootDir: path.resolve(__dirname),
  moduleFileExtensions: [
    'ts',
    'tsx',
    'json',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      'tsConfig': TsConfigPath
    }
  },
  testMatch: [
    '**/src/**/*.(test|spec).ts'
  ],
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1'
  }
}
