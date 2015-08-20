var express = require('express');
var status = require('http-status');
var multer = require('multer');

var uploader = multer({dest: 'uploads/'}).single('file')
var router = express.Router();

/* POST a new file */
router.post('/files', checkUploadRequest, uploader, function(req, res) {
  res.status(status.UNAUTHORIZED).end();
});

function checkUploadRequest(req, res, next) {
  if (!req.body.token || !req.file)
    res.status(status.BAD_REQUEST).end();  
}

module.exports = router;
