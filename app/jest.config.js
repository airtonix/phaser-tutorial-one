/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const TsConfigPath = path.resolve(__dirname, 'tsconfig.test.json')

module.exports = {
  rootDir: path.resolve(__dirname),
  moduleFileExtensions: [
    'ts',
    'tsx',
    'json',
    'js',
    'css'
  ],
  setupFiles: [
    'jest-canvas-mock'
  ],
  globals: {
    'ts-jest': {
      'tsConfig': TsConfigPath
    }
  },
  testMatch: [
    '**/src/**/*.(test|spec).(ts|tsx)'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!('
      + 'phaser3-rex-plugins'
      // + "|other-module"
    + ')/)',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
    '\\.(css|less|sass|scss)$': '<rootDir>/tools/jest.stylemock.js'
  },
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1'
  }
}
