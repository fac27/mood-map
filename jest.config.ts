import nextJest from "next/jest";
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: "jsdom",
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "/node_modules",
    "src/app/layout.js",
    "node_modules/jose/dist/browser/index.js",
    "src/lib/server/client.js",
  ],
  moduleNameMapper: {
    '^jose$': require.resolve('jose'),
  },
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage",
 
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
