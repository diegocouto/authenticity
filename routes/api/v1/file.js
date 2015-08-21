require('rootpath')();

var express = require('express');
var status = require('http-status');
var multer = require('multer');

var uploader = multer({dest: 'uploads/'}).single('file')
var router = express.Router();

var Token = require('models').Token;

/* POST a new file */
router.post('/files', checkCredentials, uploader, function(req, res) {
  if (!req.file)
    res.status(status.BAD_REQUEST).end();  
});

function checkCredentials(req, res, done) {
  token = req.body.token

  if (!token)
    res.status(status.BAD_REQUEST).end();

  //TODO Find token.
  //res.status(status.UNAUTHORIZED).end();
  
  done();
}

module.exports = router;
