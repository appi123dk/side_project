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
  };

  Products.prototype.dateFormat = (date) => (
    moment(date).format('YYYY-MM-DD')
  );

  Products.prototype.numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  };

  return Products;
};