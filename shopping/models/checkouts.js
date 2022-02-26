'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkouts = sequelize.define('Checkouts', {
    imp_uid: DataTypes.STRING,
    merchant_uid: DataTypes.STRING,
    paid_amount: DataTypes.INTEGER,
    apply_num: DataTypes.STRING,
    buyer_email: DataTypes.STRING,
    buyer_name: DataTypes.STRING,
    buyer_tel: DataTypes.STRING,
    buyer_addr: DataTypes.STRING,
    buyer_postcode: DataTypes.STRING,
    status: DataTypes.STRING,
    song_jang: DataTypes.STRING
  }, {});

  // 년-월-일
  Checkouts.prototype.dateFormat = (date) => (
    moment(date).format('YYYY-MM-DD // h:mm')
  );
  
  Checkouts.associate = function(models) {
    // associations can be defined here
  };
  return Checkouts;
};