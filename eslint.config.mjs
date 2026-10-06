import pluginJs from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  // Node envrionment
  { languageOptions: { globals: { ...globals.node } } },

  // Recommended JS rules
  pluginJs.configs.recommended,

  // Perfectionist configuration
  perfectionist.configs['recommended-natural'],

  // React configuration
  {
    files: ['**/*.{js, jsx, mjs, cjs, ts, tsx'],
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser
      }
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.{js, jsx, mjs, cjs, ts, tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules
    }
  },

  // Prettier
  eslintPluginPrettierRecommended,

  // Ignored directories
  { ignores: ['node_modules/**', 'dist/**', 'build/**'] }
]);
