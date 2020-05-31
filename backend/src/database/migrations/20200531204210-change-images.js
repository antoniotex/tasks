'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('images', 'url', 'location')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('url', 'images', 'location')
  }
};
