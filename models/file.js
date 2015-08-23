'use strict';

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
  });

  return File;
};