'use strict';
const passwordHash = require('../helpers/passwordHash');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING 
  }, {});
  

  // beforCreate, afterValidate 등 'hooks'라고 함. 추가적으로 검색하여 공부
  Users.beforeCreate((user, _) => {
    user.password = passwordHash(user.password);
  });

  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Products, {
      as: 'products',
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Users;
};