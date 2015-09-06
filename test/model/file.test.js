var chai = require("chai");  
var chaiAsPromised = require("chai-as-promised");  
chai.use(chaiAsPromised);  
chai.should();

var app = require('../../app');

// describe('File', function() {
//   beforeEach(function () {
//     this.File = app.get('models').File;
//     this.File.destroy({where: true});
//   });

//   describe('on file validation', function(){
//     it('throw exception when creating without a key.', function(done){
//       this.File.create({path: 'path'}).should.be.rejectedWith('notNull Violation').notify(done);
//     });

//     it('throw exception when creating without a path.', function(done){
//       this.File.create({key: 'simple_key'}).should.be.rejectedWith('notNull Violation').notify(done);
//     });

//     it('throw exception when creating a file with a non-unique key', function(done){
//       file = this.File;

//       file.create({key: 'simple_key', path: 'path'}).then(function(first_file) {
//         file.create({key: first_file.key, path: 'another_path'}).should.be.rejectedWith('Validation error').notify(done);
//       });
//     });
//   });

//   describe('on successful creation', function() {
//     it('returns a file with key, description, path and creation date.', function(){
//       return this.File.create({key: 'simple_key', description: 'description', path: 'path'}).then(function(file) {
//         file.key.should.be.equal('simple_key');
//         file.description.should.be.equal('description');
//         file.path.should.be.equal('path');
//         file.createdAt.should.be.an.instanceOf(Date);
//       });
//     });
//   });
// });
