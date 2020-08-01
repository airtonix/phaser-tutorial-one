module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    'eslint-plugin-import'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-extra-semi': [
      'error'
    ],
    'member-access': 0,
    'space-before-function-paren': 'error',
    'import/order': ['error', {
      'newlines-between': 'always'
    }] ,
    'jsx-quotes': [2, 'prefer-single'],
    '@typescript-eslint/quotes': [2, 'single'],
    'quotes': [2, 'single']
  }
};