'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tms_queues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dock_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tms_docks',
          key: 'id'
        }
      },
      vehicle_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tms_vehicles',
          key: 'id'
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      check_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tms_queues');
  }
};