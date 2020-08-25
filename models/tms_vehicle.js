'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tms_vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get id() {
      return this.id
    }
    get police_reg_number() {
      return this.police_reg_number
    }
  };
  tms_vehicle.init({
    police_reg_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tms_vehicle',
  });

  tms_vehicle.associate = function(models) {
    tms_vehicle.hasMany(models.tms_queue, { foreignKey: 'vehicle_id' })
  }
  return tms_vehicle;
};