'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('posters', 'description', {
      type: Sequelize.STRING(3500),
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('posters', 'description', {
      type: Sequelize.STRING,
    })
  }
};
