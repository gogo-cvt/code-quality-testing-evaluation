import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  { languageOptions: { globals: { ...globals.node } } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  { ignores: ['node_modules/**'] }
]);
