module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multiple-empty-lines': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-console': 0,
    'global-require': 0,
    'import/newline-after-import': 0,
    'spaced-comment': 0,
    'semi': 0,
    'comma-dangle': 0,
    'key-spacing': 0,
    'arrow-spacing': 0,
    'no-undef': process.env.NODE_ENV === 'production' ? 1 : 0,
    'object-curly-spacing': 0,
    'max-len': 0,
    'no-useless-escape': process.env.NODE_ENV === 'production' ? 1 : 0,
    //vuex的mutation里会有
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'no-shadow': process.env.NODE_ENV === 'production' ? 1 : 0,
    'yoda': 0,
  }
}
