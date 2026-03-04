import jsEslintPlugin from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxAllyPlugin from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importSortPlugin from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  tseslint.configs.strict,
  jsEslintPlugin.configs.recommended,
  reactHooksPlugin.configs['recommended-latest'],
  eslintConfigPrettier,
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['**/*.stories.tsx', '**/tsconfig.json'],
    plugins: {
      prettier,
      react: reactPlugin,
      import: importPlugin,
      'jsx-a11y': jsxAllyPlugin,
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': importSortPlugin,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/require-default-props': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-void': ['error', { allowAsStatement: true }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'acc'] }],
      'max-len': ['error', { ignoreComments: true, code: 120 }],
      'no-dupe-keys': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next', '^@?\\w', 'classnames'],
            ['@/test.*'],
            ['@/app.*'],
            ['@/pages.*'],
            ['@/widgets.*'],
            ['@/feature.*'],
            ['@/entities.*'],
            ['@/shared.*', '~/styles/colors.module.scss'],
            ['^\\.\\./?'],
            ['^\\./?'],
            ['^(.+)\\.module\\.scss$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'jsx-a11y/label-has-for': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'jsx-a11y/no-autofocus': [
        'off',
        {
          ignoreNonDOM: true,
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: false,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['*.config.{js,mjs,cjs}', 'server.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
]);
