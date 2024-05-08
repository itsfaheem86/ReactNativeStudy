module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    // 'node_modules/(?!@react-native|module1|module2)',
    'node_modules/(?!@react-native|react-native|react-redux)',
  ],
};
