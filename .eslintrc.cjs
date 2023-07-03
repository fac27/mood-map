module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
    "prettier",
    "next/core-web-vitals",
    "plugin:cypress/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "cypress"],
  root: true,
  overrides: [
    {
      files: ["*.cy.js", "*.test.js"],
      rules: {
        "require-jsdoc": "off",
      },
    },
  ],
};
