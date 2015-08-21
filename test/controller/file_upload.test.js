var expect = require('chai').expect;
var supertest = require('supertest');
var status = require('http-status');

var app = require('../../app');
var api = supertest(app);

describe('File Upload', function() {
  describe('on auth problems', function() {
    it('returns bad request if an authorization token is undefined.', function(done) {
      api.post('/api/v1/files')
        .expect(status.BAD_REQUEST, done);
    });

    it('returns bad request if a file is not provided.', function(done){
      api.post('/api/v1/files')
        .send({'token': '8cQS19459eymAmUjMEu989scPuGwjVrt'})
        .expect(status.BAD_REQUEST, done);
    });

    it('returns unauthorized if the authorization token is invalid.', function(done) {
      api.post('/api/v1/files')
        .field('token', '8cQS19459eymAmUjMEu989scPuGwjVrt')
        .attach('file', 'test/fixtures/sample.txt')
        .end(function(err, res) {
          expect(res.status).to.be.equal(status.UNAUTHORIZED);
          done();
        });
    });
  });

  describe('on file validation', function(){
    it('returns unprocessable entity if file size is too large.');
    it('returns unprocessable entity if file type is not allowed.');
  });

  describe('on upload problems', function(){
    it('returns unprocessable entity if the provided file key already exists.')
  });

  describe('on successful upload', function() {
    it('returns file url.');
  });
});
