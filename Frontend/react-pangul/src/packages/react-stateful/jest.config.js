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
    '<rootDir>/test',
  ],
  'testRegex': '.*\\.test.*\\.ts',
  'transform': {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
