'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addConstraint(
        "Comments",
        ['blogid'],{
          type: 'FOREIGN KEY',
          name: 'FK_blogid',
          references: {
            table: 'Blogs',
            field: 'id'
          }
        }
      )

   
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.removeConstraint(
        'Comments',
        'FK_blogid'
      );
    
  }
};
