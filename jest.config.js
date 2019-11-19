module.exports = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    // process js with `babel-jest`
    '^.+\\.js$': 'babel-jest',
    // process `*.vue` files with `vue-jest`
    '^.+\\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
