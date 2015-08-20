'use strict';

var hat = require('hat');

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      generate: function(service, callback) {
           
      }
    }
  });

return Token;
};