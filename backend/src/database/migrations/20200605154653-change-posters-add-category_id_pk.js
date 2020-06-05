'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posters', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'categories', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }, {
      after: 'description'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('posters', 'category_id')
  }
};
