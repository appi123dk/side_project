'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmailKey = sequelize.define('EmailKey', {
    hash_key: DataTypes.STRING
  }, {});
  EmailKey.associate = function(models) {
    // associations can be defined here
  };
  return EmailKey;
};