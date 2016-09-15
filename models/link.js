'use strict';
module.exports = function(sequelize, DataTypes) {
  var links = sequelize.define('links', {
    url: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return links;
};
