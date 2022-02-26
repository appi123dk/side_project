'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {

    Tag.belongsToMany(models.Products, {
      through: {
        model: 'TagProducts',
        unique: false
      },
      as: 'Product',
      foreignKey: 'tag_id',
      sourceKey: 'id',
      constraints: false
    });

  };
  return Tag;
};