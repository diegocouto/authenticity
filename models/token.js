'use strict';

var Sequelize = require("sequelize")
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
      generate: function(service) {
        return Token.create({key: hat(), service: service})
          .catch(Sequelize.ValidationError, function(err) {
            Token.generate(service);
          })      
      }
    }
  });

return Token;
};