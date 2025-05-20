const path = require('path');

module.exports = {
  mode: 'production',
  entry: './srcjs/background.js',
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist'),
    library: { type: 'module' },
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  target: 'web',
};
