'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('posters', 'latitude', { type: Sequelize.STRING, allowNull: true, }),
      queryInterface.addColumn('posters', 'longitude', { type: Sequelize.STRING, allowNull: true, })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('posters', 'latitude'),
      queryInterface.removeColumn('posters', 'longitude')
    ]);
  }
};
