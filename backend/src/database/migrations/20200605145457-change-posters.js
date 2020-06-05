'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('posters', 'category', 'category_id')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('url', 'category_id', 'category')
  }
};
