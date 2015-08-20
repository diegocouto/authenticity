'use strict';

module.exports = function(sequelize, DataTypes) {
  var File = sequelize.define('File', {
    key: DataTypes.STRING,
    description: DataTypes.TEXT,
    path: DataTypes.STRING
  });

  return File;
};