'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'Products',
      'user_id',
      Sequelize.INTEGER
      // {
      //   type: Sequelize.INTEGER,
      //   references: {
      //       model: 'Contacts',
      //       key: 'id',
      //   }
      // }
      
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn(
      'Products',
      'user_id',
      Sequelize.INTEGER
    )
  }
};
