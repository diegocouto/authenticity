var express = require('express');
var router = express.Router();
var status = require('http-status');

var File = require('../models').File

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Authenticity'});
});

router.get('/files/:file_key/download', function(req, res, next) {
  File.findOne({where: {key: req.params.file_key}}).then(function(file) {
    if(file)
      return res.download(file.path);

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
});

module.exports = router;
