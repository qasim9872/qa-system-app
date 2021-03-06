module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended"
    // "prettier/vue"
  ],
  rules: {
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        "ignores": [
          "nuxt",
          "nuxt-link"
        ]
      }
    ],
    "no-console": [
      "error",
      {
        "allow": [
          "log",
          "error",
          "warn"
        ]
      }
    ]
  },
  globals: {
    "$nuxt": true
  },
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
