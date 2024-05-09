module.exports = api => {
  const isTest = api.env('test');
  // Will be true when running jest
  // You can use isTest to determine what presets and plugins to use.

  return {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  };
};
