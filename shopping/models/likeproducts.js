'use strict';
module.exports = (sequelize, DataTypes) => {
  const LikeProducts = sequelize.define('LikeProducts', {
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  LikeProducts.associate = function(models) {
    // associations can be defined here
  };
  return LikeProducts;
};