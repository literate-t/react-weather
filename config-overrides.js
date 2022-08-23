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

    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };
    config.plugins = newPlugins;

    return config;
  },
};
