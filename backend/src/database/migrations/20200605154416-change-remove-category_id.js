'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('posters', 'category_id')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posters', 'category_id', Sequelize.INTEGER)
  }
};
