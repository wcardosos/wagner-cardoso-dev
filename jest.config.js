module.exports = {
    roots: ["<rootDir>/tests"],
    transform: {
    "^.+\\.tsx?$": ["@swc/jest"],
   },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "jest-environment-jsdom",
};
