import pluginJs from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginNode from 'eslint-plugin-n';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  // Node environment
  { languageOptions: { globals: { ...globals.node } } },

  // Recommended JS rules
  pluginJs.configs.recommended,

  // Perfectionist
  perfectionist.configs['recommended-natural'],

  // Backend configuration
  {
    files: ['packages/backend/src/**/*.{js, mjs, cjs}'],
    ...pluginNode.configs['flat/recommended-script'],
    rules: {
      ...pluginNode.configs['flat/recommended-script'].rules,
      'no-unused-vars': ['error', {argsIgnorePattern: '^(next|req|res|_)'}],
      'n/no-processes-exit': 'off',
      'n/no-unpublished-import': 'off'
    }
  },

  // Frontend Configuration
  {
    files: ['packages/frontend/src/**/*.{js,jsx,ts,tsx}'],
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      ...pluginReact.configs.flat.recommended.plugins,
      'jsx-a11y': jsxA11y,
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: {
        version: '18.2'
      }
    }
  },

  // Prettier
  eslintPluginPrettierRecommended,

  // Ignored directories
  { ignores: ['node_modules/**', 'dist/**', 'build/**'] }
]);
