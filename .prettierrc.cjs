/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 140,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  trailingComma: 'all',
  arrowParens: 'always',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '^node:(.*)$',
    '^@react$',
    '^react-$',
    '^vite$',
    '^@vitejs/(.*)$',
    '^@vite-(.*)$',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/(.*)$',
    '^[.]',
    '^/(.*)$',
  ],
};
