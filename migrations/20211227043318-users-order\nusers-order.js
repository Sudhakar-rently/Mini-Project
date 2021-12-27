'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('orders',{
      fields:['user_id'],
      type:'foreign key',
      name:'users_order',
      onDelete: 'cascade',
      references:{
        table:'users',
        field:'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('orders',{
      fields:['user_id'],
      type:'foreign key',
      name:'users_order',
      onDelete: 'cascade',
      references:{
        table:'users',
        field:'id'
      }
    });
  }
};
