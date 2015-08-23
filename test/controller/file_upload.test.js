var expect = require('chai').expect;
var supertest = require('supertest');
var status = require('http-status');

var app = require('../../app');
var api = supertest(app);

describe('File Upload', function() {
  var valid_token;

  before(function(){
    Token = app.get('models').Token;

    Token.destroy({where: true});
    Token.generate('test').then(function(token){ valid_token = token });
  });

  describe('on auth problems', function() {
    it('returns bad request if an authorization token is undefined.', function(done) {
      api.post('/api/v1/files')
        .expect(status.BAD_REQUEST, done);
    });

    it('returns bad request if a file is not provided.', function(done){
      api.post('/api/v1/files')
        .type('form')
        .field('token_key', valid_token.key)
        .end(function(err, res) {
          expect(res.status).to.be.equal(status.BAD_REQUEST);
          done();
        });
    });

    it('returns unauthorized if the authorization token is invalid.', function(done) {
      api.post('/api/v1/files')
        .field('token_key', 'invalid_key')
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
