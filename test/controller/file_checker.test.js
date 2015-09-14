var expect = require('chai').expect;
var supertest = require('supertest');
var status = require('http-status');

var app = require('../../app');
var api = supertest(app);

describe('File Checker', function() {
  before(function(done){
    Token = app.get('models').Token;
    this.File = app.get('models').File;

    Token.destroy({where: true}).then(function(){
      Token.generate('test').then(function(token){ 
        api.post('/api/v1/files')
          .field('token_key', token.key)
          .field('file_key', 'valid_key')
          .attach('file', 'test/fixtures/valid.jpg')
          .end(function(err, res) {                   
            done();
          });      
      });
    });
  });

  after(function(){
    return this.File.destroy({where: true, individualHooks: true});
  });  

  it('returns not found if there is no file for the given file key.', function(done){
    api.get('/api/v1/files/' + 'invalid_key')
      .end(function(err, res){
        expect(res.status).to.be.equal(status.NOT_FOUND);

        done();      
      });
  });

  it('returns the file if there is a file for the given file key.', function(done){
    api.get('/api/v1/files/' + 'valid_key')
      .end(function(err, res){
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.be.null;

        done();      
      });
  });
});