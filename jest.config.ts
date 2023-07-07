import nextJest from "next/jest";
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "/node_modules",
    "src/app/layout.js",
    "node_modules/jose/dist/browser/index.js",
    "src/lib/server/client.js",
  ],
  moduleNameMapper: {
    jose: "<rootDir>/node_modules/jose/dist/browser/index.js",
  },
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jose|rehype-raw)/)",
    "/src/app/layout.js",
    "/node_modules/jose/dist/browser/index.js",
    "/src/lib/server/client.js",
  ],
};

export default createJestConfig(customJestConfig);
