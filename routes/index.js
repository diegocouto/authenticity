var express = require('express');
var router = express.Router();
var status = require('http-status');

var File = require('../models').File

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Authenticity'});
});

router.get('/:file_key', function(req, res, next) {
  File.findOne({where: {key: req.params.file_key}}).then(function(file) {
    if(file)
      return res.download(file.path);

    next();
  });
});

module.exports = router;
