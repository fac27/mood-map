module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
    "prettier",
    "next/core-web-vitals",
    "plugin:cypress/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "cypress", "jest"],
  root: true,
  overrides: [
    {
      files: ["*.cy.js", "*.test.js"],
      rules: {
        "require-jsdoc": "off",
        "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
      },
    },
  ],
};
