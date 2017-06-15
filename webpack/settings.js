import path from 'path';

export default (ROOT) => ({
  host:       'localhost',
  port:       9000,
  template:   path.join(ROOT, 'src/templates/index.dev.ejs'),
  entry:      path.join(ROOT, 'src/js', 'main.js'),
  buildPath:  path.join(ROOT, 'dist/'),
  stylesPath: path.join(ROOT, 'src/scss'),
  assetsPath: path.join(ROOT, 'src/assets'),
  outputName: `js/bundle.[hash:8].js`,
  maxInlineAssetSize: 32768
})
