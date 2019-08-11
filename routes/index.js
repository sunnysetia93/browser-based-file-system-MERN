const route = require('express').Router();

route.use('/folder',require('./api/Folder'));
route.use('/file',require('./api/File'));

module.exports = route;