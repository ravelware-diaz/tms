'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tms_dock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get id() {
      return this.id
    }
    get dock_code() {
      return this.dock_code
    }
    get queueCount() {
      return this.queueCount
    }
  };
  tms_dock.init({
    dock_code: DataTypes.STRING,
    queueCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tms_dock',
  });

  tms_dock.associate = function(models) {
    tms_dock.hasMany(models.tms_queue, { foreignKey: 'dock_id' })
  }
  return tms_dock;
};