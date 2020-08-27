'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tms_rfid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tms_rfid.init({
    uid: DataTypes.STRING,
    cycle: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tms_rfid',
  });
  return tms_rfid;
};