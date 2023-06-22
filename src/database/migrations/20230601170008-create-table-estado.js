'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('states', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('states');
  }
};
