// eslint.config.js
// https://docs.expo.dev/guides/using-eslint/
const expo = require('eslint-config-expo/flat');

module.exports = [
  ...expo,
  {
    ignores: ['dist/*'],
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
