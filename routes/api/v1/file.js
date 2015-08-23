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

  if(!token_key || !req.file)
    return res.status(status.BAD_REQUEST).end();

  Token.findOne({where: {key: token_key}}).then(function(token){
    if(!token) {
      fs.unlink('uploads/' + req.file.filename);
      res.status(status.UNAUTHORIZED).end();
    }

    //TODO create file
    done();
  });  
});

module.exports = router;
