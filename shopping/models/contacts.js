'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.TEXT,
    female: DataTypes.BOOLEAN
  }, {});
  
  Contacts.associate = function(models) {
    // associations can be defined here
      Contacts.hasMany(models.ContactsComments, {
      as: 'comments',
      foreignKey: 'contact_id',
      sourceKey: 'id',
    });
  };

  Contacts.prototype.dateFormat = (date) => (
    moment(date).format('YYYY-MM-DD')
  );

  return Contacts;
};