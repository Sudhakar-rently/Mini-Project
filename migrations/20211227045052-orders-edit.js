'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('orders','deletedAt',{
      type:sequelize.DATE,
      paranoid:true
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('orders','deletedAt');
  }
};
