module.exports = {
  "env": {
      "browser": true,
      "node": true
  },
  "ignorePatterns": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": "tsconfig.json",
      "sourceType": "module"
  },
  "plugins": [
      "@typescript-eslint",
      "import",
      "no-null"
  ],
  "rules": {
      "@typescript-eslint/await-thenable": [
          "warn"
      ],
      "import/no-extraneous-dependencies": [
          "warn"
      ],
      "no-return-await": [
          "warn"
      ],
      "no-void": [
          "warn"
      ],
      "@typescript-eslint/no-explicit-any": [
          "off"
      ],
      "camelcase": [
          "off"
      ],
      "comma-dangle": [
          "off"
      ],
      "id-blacklist": [
          "off"
      ],
      "id-match": [
          "off"
      ],
      "no-magic-numbers": [
          "off"
      ],
      "no-underscore-dangle": [
          "off"
      ],
      "no-unused-expressions": [
          "off"
      ],
      "@typescript-eslint/class-name-casing": [
          "error"
      ],
      "@typescript-eslint/consistent-type-definitions": [
          "error"
      ],
      "@typescript-eslint/indent": [
          "error",
          2
      ],
      "@typescript-eslint/quotes": [
          "error",
          "single",
          {
              "avoidEscape": true
          }
      ],
      "@typescript-eslint/semi": [
          "error",
          "always"
      ],
      "@typescript-eslint/type-annotation-spacing": [
          "error"
      ],
      "arrow-body-style": [
          "error",
          "as-needed"
      ],
      "arrow-parens": [
          "error",
          "as-needed"
      ],
      "curly": [
          "error"
      ],
      "eol-last": [
          "error"
      ],
      "eqeqeq": [
          "error",
          "smart"
      ],
      "guard-for-in": [
          "error"
      ],
      "import/no-deprecated": [
          "error"
      ],
      "max-len": [
          "error",
          {
              "code": 180
          }
      ],
      "no-multiple-empty-lines": [
          "error"
      ],
      "no-new-wrappers": [
          "error"
      ],
      "no-null/no-null": [
          "error"
      ],
      "no-shadow": [
          "error",
          {
              "hoist": "all",
              "builtinGlobals": false
          }
      ],
      "no-throw-literal": [
          "error"
      ],
      "no-trailing-spaces": [
          "error"
      ],
      "no-var": [
          "error"
      ],
      "one-var": [
          "error",
          "never"
      ],
      "prefer-const": [
          "error",
          {
              "destructuring": "all",
              "ignoreReadBeforeAssign": false
          }
      ],
      "radix": [
          "off"
      ],
      "spaced-comment": [
          "error"
      ],
  },
  "settings": {
    "import/core-modules": [
      "winston-transport"
    ]
  }
};
