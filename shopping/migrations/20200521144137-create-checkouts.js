'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Checkouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imp_uid: {
        type: Sequelize.STRING
      },
      merchant_uid: {
        type: Sequelize.STRING
      },
      paid_amount: {
        type: Sequelize.INTEGER
      },
      apply_num: {
        type: Sequelize.STRING
      },
      buyer_email: {
        type: Sequelize.STRING
      },
      buyer_name: {
        type: Sequelize.STRING
      },
      buyer_tel: {
        type: Sequelize.STRING
      },
      buyer_addr: {
        type: Sequelize.STRING
      },
      buyer_postcode: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      song_jang: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Checkouts');
  }
};