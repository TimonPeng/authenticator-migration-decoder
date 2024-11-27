/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['react-refresh'],
  ignorePatterns: ['node_modules/', 'dist/'],
  env: { browser: true, es2020: true },
  rules: {
    'no-empty': 'off',
    'no-constant-condition': 'off',
    '@typescript-eslint/consistent-generic-constructors': 'error',
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
