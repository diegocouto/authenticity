require('rootpath')();

var express = require('express');
var status = require('http-status');
var multer = require('multer');
var config = require('config');

var router = express.Router();
var uploader = multer(config.get('File.multer')).single('file');

var Token = require('models').Token;
var File = require('models').File;

/* POST a new file */
router.post('/files', uploader, function(req, res, done) {
  token_key = req.body.token_key
  file_key = req.body.file_key

  if(!token_key || !file_key || !req.file) {
    if(req.file)
      File.destroyFromFS(req.file.path);
    
    return res.status(status.BAD_REQUEST).end();
  }

  Token.findOne({where: {key: token_key}}).then(function(token) {
    if(!token) {
      return File.destroyFromFS(req.file.path, function(){
        res.status(status.UNAUTHORIZED).end();
      });
    }

    File.create({description: req.body.description, key: file_key, path: req.file.path})
      .then(function(file) {
        res.json(file);
      }).catch(function(err) {
        File.destroyFromFS(req.file.path, function(){
          res.status(status.UNPROCESSABLE_ENTITY).send(err).end()
        });        
      });
  });
});

module.exports = router;
