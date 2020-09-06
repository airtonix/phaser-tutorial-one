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
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': 'identity-obj-proxy'
  }
}
