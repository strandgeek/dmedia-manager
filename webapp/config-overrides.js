const path = require('path');
const { removeModuleScopePlugin, babelInclude, addWebpackAlias } = require("customize-cra");


module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify"),
      "url": require.resolve("url")
  })
  config.resolve.fallback = fallback;

  config = removeModuleScopePlugin()(config);
  config = babelInclude([
    path.resolve("src"),
    path.resolve("../common/src"),
  ])(config)
  config = addWebpackAlias({
    '@common': path.resolve(__dirname, '../common/src')
  })(config)

  return config;
}
