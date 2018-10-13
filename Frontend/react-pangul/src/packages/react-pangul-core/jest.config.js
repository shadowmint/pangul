module.exports = {
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  'roots': [
    '<rootDir>/src',
  ],
  'testRegex': '.*\\.test.*\\.ts',
  'transform': {
    '^.+\\.tsx?$': 'ts-jest',
  },
};