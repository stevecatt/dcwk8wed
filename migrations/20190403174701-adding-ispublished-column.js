'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Blogs',
      'ispublished',{
        type:Sequelize.BOOLEAN
      }
    )

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Blogs',
      'ispublished'
    )
  }
};
