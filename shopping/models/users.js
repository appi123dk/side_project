'use strict';
const passwordHash = require('../helpers/passwordHash');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING,
    status: DataTypes.STRING 
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

    Users.belongsToMany(models.Products, { 
      through: 'LikeProducts',
      as: 'Likes', 
      foreignKey: 'user_id',
      sourceKey: 'id'
    });

    // 이메일인증관련
    Users.hasMany(models.EmailKey, { foreignKey: 'user_id', sourceKey: 'id' });

    // Users.belongsToMany(models.Products, {
    //   through: {
    //     model: 'LikesProducts',
    //     unique: false
    //   },
    //   as: 'Likes',
    //   foreignKey: 'user_id',
    //   sourceKey: 'id',
    //   contstraints: false
    // });
  };
  return Users;
};