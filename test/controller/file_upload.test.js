var expect = require('chai').expect;
var supertest = require('supertest');
var status = require('http-status');

var app = require('../../app');
var api = supertest(app);

describe('File Upload', function() {
  var valid_token;

  before(function(done){
    Token = app.get('models').Token;
    this.File = app.get('models').File;

    this.File.destroy({where: true});

    Token.destroy({where: true}).then(function(){
      Token.generate('test').then(function(token){ 
        valid_token = token;
        done();
      });
    });
  });

  describe('on auth problems', function() {
    it('returns bad request if an authorization token is undefined.', function(done) {
      api.post('/api/v1/files')
        .field('file_key', 'TST-12345-67891-01112')
        .attach('file', 'test/fixtures/sample.txt')
        .expect(status.BAD_REQUEST, done);
    });

    it('returns unauthorized if the authorization token is invalid.', function(done) {
      api.post('/api/v1/files')
        .field('token_key', 'invalid_key')
        .field('file_key', 'TST-12345-67891-01112')
        .attach('file', 'test/fixtures/sample.txt')
        .end(function(err, res) {
          expect(res.status).to.be.equal(status.UNAUTHORIZED);
          done();
        });
    });
  });

  describe('on request validation', function(){
    it('returns bad request if a file is not provided.', function(done){
      api.post('/api/v1/files')
        .type('form')
        .field('token_key', valid_token.key)
        .field('file_key', 'TST-12345-67891-01112')
        .end(function(err, res) {
          expect(res.status).to.be.equal(status.BAD_REQUEST);
          done();
        });
    });

    it('return bad request if a file key is not provided.', function(done){
      api.post('/api/v1/files')
        .field('token_key', valid_token.key)
        .attach('file', 'test/fixtures/sample.txt')
        .end(function(err, res) {
          expect(res.status).to.be.equal(status.BAD_REQUEST);
          done();
        });
    });

    it('returns unprocessable entity if file size is too large.');
    it('returns unprocessable entity if file type is not allowed.');
  });

  describe('on upload problems', function(){
    it('returns unprocessable entity if the provided file key already exists.', function(done) {
      this.File.create({key: "unique_key", path: "sample_path"}).then(function(file){
        api.post('/api/v1/files')
          .field('token_key', valid_token.key)
          .field('file_key', file.key)
          .attach('file', 'test/fixtures/sample.txt')
          .end(function(err, res) {
            expect(res.status).to.be.equal(status.UNPROCESSABLE_ENTITY);
            done();
          });
      });
    });
  });

  describe('on successful upload', function() {
    it('returns file url, key and creation date.');
  });
});
