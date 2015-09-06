'use strict';

var fs = require('fs');

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
    }
  }, {
    hooks: {
      afterDestroy: function(file, opts, next) {
        File.destroyFromFS(file.path)
        next();
      }
    },

    classMethods: { 
      destroyFromFS: function(fullPath) {
        fs.exists(fullPath, function(exists) {
          if(exists)
            fs.unlink(fullPath);
        }); 
      }
    }
  });

  return File;
};