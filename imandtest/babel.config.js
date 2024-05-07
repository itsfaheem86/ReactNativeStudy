module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '^@app/(.+)': './src/\\1', // Checks only one time https://stackoverflow.com/questions/38705002/the-meaning-of-1-operator-in-java-regexes
        },
      },
    ],
  ],
};
