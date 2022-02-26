'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
  }, {});
  
  Products.associate = function(models) {
    // associations can be defined here
    Products.hasMany(models.ProductsMemo,{
      as: 'memos',
      foreignKey: 'product_id',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    });

    Products.belongsTo(models.Users, 
      { 
        as: 'Owner', 
        foreignKey: 'user_id', 
        targetKey: 'id' 
      });

    Products.belongsToMany(models.Users, {
      through: 'LikeProducts',
      as: 'LikeUser',
      foreignKey: 'product_id',
      sourceKey: 'id'
    });

    Products.belongsToMany(models.Tag, {
      through: 'TagProducts',
      as: 'Tag',
      foreignKey: 'product_id',
      sourceKey: 'id',
      constraints: false
    });

    // Products.belongsToMany(models.Users,{
    //   throught: {
    //     model: 'LikesProducts',
    //     unique: false
    //   },
    //   as: 'LikeUser',
    //   foreignKey: 'product_id',
    //   sourceKey: 'id',
    //   constraint: false
    // });
  };

  Products.prototype.dateFormat = (date) => (
    moment(date).format('YYYY-MM-DD')
  );

  Products.prototype.numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  };

  return Products;
};