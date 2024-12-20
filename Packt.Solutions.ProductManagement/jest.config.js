/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  verbose: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(scss)$': 'identity-obj-proxy',
    '@microsoft/sp-core-library|@microsoft/sp-image-helper$': 'identity-obj-proxy',
    'PackProductCatalogWebPartStrings': '<rootDir>/src/webparts/packProductCatalog/loc/mystrings.d.ts',
  }
};

