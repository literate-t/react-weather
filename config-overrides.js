const webpack = require('webpack');

module.exports = {
  webpack: (config, env) => {
    const newPlugins = config.plugins.filter(
      (plugin) => !(plugin instanceof webpack.DefinePlugin)
    );

    newPlugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      })
    );
    config.plugins = newPlugins;

    return config;
  },
};
