/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const TsConfigPath = path.resolve(__dirname, 'tsconfig.test.json')

module.exports = {
  rootDir: path.resolve(__dirname),
  setupFiles: [
    'jest-canvas-mock'
  ],
  preset: 'ts-jest',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'json',
    'js'
  ],
  globals: {
    'ts-jest': {
      'tsConfig': TsConfigPath
    }
  },
  testMatch: [
    '**/src/**/*.(test|spec).(ts|tsx)'
  ],
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1'
  }
}
