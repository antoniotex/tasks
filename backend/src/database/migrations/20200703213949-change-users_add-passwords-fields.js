'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'password_reset_token', { type: Sequelize.STRING, allowNull: true, }),
      queryInterface.addColumn('users', 'password_reset_expires', { type: Sequelize.DATE, allowNull: true, })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'password_reset_token'),
      queryInterface.removeColumn('users', 'password_reset_expires')
    ]);
  }
};
