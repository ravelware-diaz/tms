'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routers');
module.exports = (sequelize, DataTypes) => {
  class tms_queue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get id() {
      return this.id
    }
    get dock_id() {
      return this.dock_id
    }
    get vehicle_id() {
      return this.vehicle_id
    }
    get status() {
      return this.status
    }
    get check_in() {
      return this.check_in
    }    
  };
  tms_queue.init({
    dock_id: DataTypes.INTEGER,
    vehicle_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    check_in: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (tms_queue, options) => {
        tms_queue.status = 'Pending'
        tms_queue.check_in = new Date()
      }
    },
    sequelize,
    modelName: 'tms_queue',
  });

  tms_queue.associate = function(models) {
    tms_queue.belongsTo(models.tms_dock, { foreignKey: 'dock_id' })
    tms_queue.belongsTo(models.tms_vehicle, { foreignKey: 'vehicle_id' })
  }
  return tms_queue;
};