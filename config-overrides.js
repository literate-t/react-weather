module.exports = {
  webpack: (config, env) => {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify'),
    });

    return config;
  },
};
