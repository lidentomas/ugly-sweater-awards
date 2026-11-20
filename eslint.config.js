import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', '.vercel/**', 'coverage/**', 'pages-original/**'] },
  js.configs.recommended,
  {
    files: ['public/**/*.js'],
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    files: ['api/**/*.js', 'lib/**/*.js', 'test/**/*.js', '*.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
];
