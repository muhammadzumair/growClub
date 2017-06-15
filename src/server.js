import express from 'express';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack/dev.js';

const app = express();
const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/dist'));

app.use(webpackDev(compiler, {
  hot: true,
  filename: webpackConfig.output.filename,
  publicPath: webpackConfig.output.publicPath,
  stats: 'minimal',
  historyApiFallback: true
}));

app.use(webpackHot(compiler, {
  log: console.log,
  heartbeat: 10 * 1000
}));

const server = app.listen(9000, () => {
  console.log(`Server is listening at http://localhost:${server.address().port}`);
});
