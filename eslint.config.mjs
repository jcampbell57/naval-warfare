import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    languageOptions: { globals: globals.browser },
    env: {
      browser: true,
      amd: true,
      node: true,
    },
  },

  pluginJs.configs.recommended,
  eslintConfigPrettier,
]
