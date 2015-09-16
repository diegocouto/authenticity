'use strict';

var fs = require('fs');
var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var File = sequelize.define('File', {
    description: DataTypes.TEXT,
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    md5Digest: {
      type: DataTypes.STRING,
    },
    sha1Digest: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate: function(file, opts, next) {
        file.createDigests(file, next);  
      },      
      beforeUpdate: function(file, opts, next) {
        file.createDigests(file, next);  
      },
      afterDestroy: function(file, opts, next) {
        File.destroyFromFS(file.path, next)
      }
    },
    instanceMethods: {
      createDigests: function(file, next) {
        var stream = fs.createReadStream(this.path);
        var hashes = {
          'md5': crypto.createHash('md5'),
          'sha1': crypto.createHash('sha1')
        }

        stream.on('data', function (data) {
          hashes['md5'].update(data, 'utf8');
          hashes['sha1'].update(data, 'utf8');
        })

        stream.on('end', function () {
          file.md5Digest = hashes['md5'].digest('hex');
          file.sha1Digest = hashes['sha1'].digest('hex');

          next();
        })        
      }
    },
    classMethods: { 
      destroyFromFS: function(fullPath, next) {
        fs.exists(fullPath, function(exists) {
          if(exists) {
            fs.unlink(fullPath, next);
          } else {
            next()
          }
        }); 
      }
    }
  });

  return File;
};