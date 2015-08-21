var chai = require("chai");  
var chaiAsPromised = require("chai-as-promised");  
chai.use(chaiAsPromised);  
chai.should();

var app = require('../../app');

describe('Token', function() {
  beforeEach(function () {
    this.Token = app.get('models').Token;
    this.Token.destroy({where: true});
  });

  describe('on token validation', function(){
    it('throw exception when creating without a service.', function(done){
      this.Token.create({key: 'simple_key'}).should.be.rejectedWith('service cannot be null').notify(done);
    });

    it('throw exception when creating a non-unique key', function(done){
      token = this.Token;

      token.create({key: 'simple_key', service: 'service'}).then(function(valid_token) {
        token.create({key: valid_token.key, service: valid_token.service}).should.be.rejectedWith('Validation error').notify(done);
      });
    });
  });

  describe('on successful creation', function() {
    it('generates a valid token given a service name.', function(){
      return this.Token.generate('service').then(function(token) {
        token.key.should.not.be.null;
        token.service.should.be.equal('service');
      });
    });

    it('returns a token key, service and creation date.', function(){
      return this.Token.create({key: 'simple_key', service: 'service'}).then(function(token) {
        token.key.should.be.equal('simple_key');
        token.service.should.be.equal('service');
        token.createdAt.should.be.an.instanceOf(Date);
      });
    });
  });
});
