'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      neighborhood_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'neighborhoods', key: 'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true
        }

  })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('addresses');
  }
};
