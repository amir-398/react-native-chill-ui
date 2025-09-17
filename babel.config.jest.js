module.exports = {
  plugins: ['@babel/plugin-transform-class-static-block'],
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript', '@babel/preset-react'],
};
