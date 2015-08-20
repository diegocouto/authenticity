var chai = require("chai");  
var chaiAsPromised = require("chai-as-promised");  
chai.use(chaiAsPromised);  
chai.should();

var app = require('../../app');

describe('Token', function() {
  beforeEach(function () {
    this.Token = require('../../models').Token;
  });

  describe('on token validation', function(){
    it('throw exception when creating without a service.', function(done){
      this.Token.create({key: 'simple_key'}).should.be.rejectedWith('service cannot be null').notify(done);
    });

    it('throw exception when creating a non-unique key', function(done){
      token = this.Token;

      token.create({key: 'simple_key', service: 'service'}).then(function(valid_token) {
        token.create({key: valid_token.key, service: valid_token.service}).should.be.rejectedWith('service cannot be null').notify(done);
      });
    });
  });

  describe('on successful creation', function() {
    it('returns an unique token key.');
    it('returns token key service.');
    it('returns token key creation date.');
  });
});
