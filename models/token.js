'use strict';

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    key: DataTypes.STRING,
    service: DataTypes.STRING
  });
  
  return Token;
};