export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { configFile: "./babel.config.test.js" }],
  },
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ["/node_modules/", "/babel.config.test.js"], // Agregado
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
