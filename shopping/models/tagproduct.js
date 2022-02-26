'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagProduct = sequelize.define('TagProduct', {
    tag_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {});
  TagProduct.associate = function(models) {
    // associations can be defined here
  };
  return TagProduct;
};