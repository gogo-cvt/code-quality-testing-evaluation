import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { version } from 'react';

export default defineConfig([
  { languageOptions: { globals: { ...globals.node } } },
  pluginJs.configs.recommended,
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
  eslintPluginPrettierRecommended,
  { ignores: ['node_modules/**', 'dist/**', 'build/**'] }
]);

