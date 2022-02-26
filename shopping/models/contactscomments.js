'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactsComments = sequelize.define('ContactsComments', {
    contents: DataTypes.STRING
  }, {});

  ContactsComments.associate = function(models) {
    // associations can be defined here

    ContactsComments.belongsTo(models.Contacts, { 
      as: 'contact',
      foreignKey: 'contact_id',
      sourceKey: 'id',
    });
  };
  return ContactsComments;
};