var express = require('express');

//Reload express after code change
if (process.env.NODE_ENV != 'production') {
  var chokidar = require('chokidar');
  var watcher = chokidar.watch('./dist').on('all', function() {
    console.log('Clearing /dist/ module cache from server');
    Object.keys(require.cache).forEach(function(id) {
      if (/node_modules/.test(id)) return;
      delete require.cache[id];
    });
  });
}

const app = express();

app.use(function(req, res, next) {
  require('./dist/app.js').default(req, res, next);
});

app.listen(8000, () => {
  console.log('Server started');
});
