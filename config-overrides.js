const webpack = require('webpack');

module.exports = {
  webpack: (config, env) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      })
    );

    return config;
  },
};
