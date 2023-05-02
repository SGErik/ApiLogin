'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Este campo não pode ficar vazio'
          },
          isEmail: {
          msg: 'Este email não é válido'
          }

        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Este campo não pode ficar vazio'
          },
          len: {
            args: [4, 16],
            msg: 'Este campo deve ter 4 e 16 caracteres'
          }
        }
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    }
    )
  },

  down(queryInterface, Sequelize) {

    return queryInterface.dropTable('users');

  }
};
