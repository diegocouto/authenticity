var chai = require("chai");  
var chaiAsPromised = require("chai-as-promised");  
chai.use(chaiAsPromised);  
chai.should();

var app = require('../../app');

describe('File', function() {
  describe('on file validation', function(){
    it('throw exception when creating without a path.');
  });

  describe('on successful creation', function() {
    it('returns a file with key, description, path and creation date.');
    it('returns a random file key if a file key is not informed.');
  });

});
