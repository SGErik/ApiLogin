'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('neighborhoods', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'cities', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false
      }
  })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('neighborhoods');
  }
};
