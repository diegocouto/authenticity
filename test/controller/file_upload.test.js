var expect = require('chai').expect;
var supertest = require('supertest');
var status = require('http-status');
var fs = require('fs');

var app = require('../../app');
var api = supertest(app);

describe('File Upload', function() {
  var valid_token;

  before(function(){
    Token = app.get('models').Token;
    this.File = app.get('models').File;

    return Token.destroy({where: true}).then(function(){
      Token.generate('test').then(function(token){ 
        valid_token = token;
      });
    });
  });

  afterEach(function(){
    return this.File.destroy({where: true, individualHooks: true});
  });  

  describe('on auth problems', function() {
    it('returns bad request if an authorization token is undefined.', function(done) {
      api.post('/api/v1/files')
        .field('file_key', 'TST-12345-67891-01112')
        .attach('file', 'test/fixtures/valid.jpg')
        .expect(status.BAD_REQUEST, done);
    });

    it('returns unauthorized if the authorization token is invalid.', function(done) {
      api.post('/api/v1/files')
        .field('token_key', 'invalid_key')
        .field('file_key', 'TST-12345-67891-01112')
        .attach('file', 'test/fixtures/valid.jpg')
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
        .attach('file', 'test/fixtures/valid.jpg')
        .end(function(err, res) {
          expect(res.status).to.be.equal(status.BAD_REQUEST);
          done();
        });
    });

    it('returns bad request if file size is too large.', function(done){
        api.post('/api/v1/files')
          .field('token_key', valid_token.key)
          .field('file_key', 'TST-12345-67891-01112')
          .attach('file', 'test/fixtures/invalid.jpg')
          .end(function(err, res) {
            expect(res.status).to.be.equal(status.BAD_REQUEST);
            done();
          });
    });

    it('returns unprocessable entity if file type is not allowed.', function(done){
      api.post('/api/v1/files')
        .field('token_key', valid_token.key)
        .field('file_key', 'TST-12345-67891-01112')
        .attach('file', 'test/fixtures/invalid.txt')
        .end(function(err, res) {
          expect(res.status).to.be.equal(status.UNPROCESSABLE_ENTITY);
          done();
        });
    });
  });

  describe('on upload problems', function(){
    it('returns unprocessable entity if the provided file key already exists.', function(done){
      this.File.create({key: 'unique_key', path: 'sample_path'}).then(function(file){
        api.post('/api/v1/files')
          .field('token_key', valid_token.key)
          .field('file_key', file.key)
          .attach('file', 'test/fixtures/valid.jpg')
          .end(function(err, res) {
            expect(res.status).to.be.equal(status.UNPROCESSABLE_ENTITY);
            done();
          });
      });
    });
  });

  describe('on successful upload', function() {
    it('store file and returns file info like key and creation date.', function(done){
      api.post('/api/v1/files')
        .field('token_key', valid_token.key)
        .field('file_key', 'unique_key')
        .attach('file', 'test/fixtures/valid.jpg')
        .end(function(err, res) {
          expect(res.status).to.be.equal(status.OK);
          expect(fs.existsSync(res.body.path)).to.be.true;
          expect(res.body.key).to.be.equal('unique_key');
          expect(res.body.created_at).to.not.be.null;
                    
          done();
        });      
    });
  });

  describe('on file register delete', function() {
    it('removes register and associated file.', function(done){
      var File = this.File;

      api.post('/api/v1/files')
        .field('token_key', valid_token.key)
        .field('file_key', 'unique_key')
        .attach('file', 'test/fixtures/valid.jpg')
        .end(function(err, res) {
          expect(fs.existsSync(res.body.path)).to.be.true;
          expect(res.status).to.be.equal(status.OK);

          File.find({where: {id: res.body.id}}).then(function(file){
            file.destroy().then(function(){
              expect(fs.existsSync(file.path)).to.be.false;
              done();
            });
          });
        });
    });
  });
});
