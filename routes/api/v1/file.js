require('rootpath')();

var fs = require('fs');
var express = require('express');
var status = require('http-status');
var multer = require('multer');

var uploader = multer({dest: 'uploads/'}).single('file');
var router = express.Router();

var Token = require('models').Token;

/* POST a new file */
router.post('/files', uploader, function(req, res, done) {
  token_key = req.body.token_key

  if(!token_key || !req.file || !req.body.file_key)
    return res.status(status.BAD_REQUEST).end();

  Token.findOne({where: {key: token_key}}).then(function(token){
    if(!token) {
      fs.unlink('uploads/' + req.file.filename);
      return res.status(status.UNAUTHORIZED).end();
    }

    File.create({
      description: req.body.description,
      key: req.body.file_key,
      path: req.file.path
    }).then(function(file){
      res.json(file);
    });

    done();
  });
});

module.exports = router;
