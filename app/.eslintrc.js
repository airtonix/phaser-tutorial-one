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
    'import/first': 'error',
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'parent',
        'sibling',
        'index',
        'object',
      ],
      'pathGroups': [
        {
          'pattern': '~/**',
          'group': 'sibling',
          position: 'before'
        }
      ],
      'newlines-between': 'always',
    }],
    'jsx-quotes': [2, 'prefer-single'],
    '@typescript-eslint/quotes': [2, 'single'],
    '@typescript-eslint/no-empty-interface': 0,
    'quotes': [2, 'single']
  }
};