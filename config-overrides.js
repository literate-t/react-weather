const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  webpack: (config, env) => {
    const newPlugins = config.plugins.filter(
      (plugin) => !(plugin instanceof webpack.DefinePlugin)
    );
    newPlugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.config().parsed),
      })
    );

    config.plugins = newPlugins;
    return config;
  },
};
