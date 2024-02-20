module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native.*|@react-native.*|@?react-navigation.*|@shopify/react-native-skia)/)',
  ],
  setupFiles: ['@shopify/react-native-skia/jestSetup.js'],
};
