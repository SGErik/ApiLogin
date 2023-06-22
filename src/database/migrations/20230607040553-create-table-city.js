'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'states', key: 'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  })
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('cities')
}
};
