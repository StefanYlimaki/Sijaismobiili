module.exports = {
  'env': {
    'es2021': true,
    'node': true,
    'react-native/react-native': true
  },
  'plugins': [
    'react', 'react-native'
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'ecmaFeatures': {
      'jsx': true
    },
    'sourceType': 'module'
  },
  'rules': {
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/sort-styles': ['error', 'asc', { 'ignoreClassNames': false, 'ignoreStyleProperties': false }],
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
