'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductsMemo = sequelize.define('ProductsMemo', {
    contents: DataTypes.TEXT
  }, {});

  ProductsMemo.associate = function(models) {
    // associations can be defined here
    // ProductsMemo.belongsTo(models.product, {
    //   foreignKey: "product_id"
    // })
  };

  ProductsMemo.prototype.dateFormat = (date) => (
    moment(date).format('YYYY-MM-DD // h:mm')
  );

  return ProductsMemo;
};