'use strict';
const fs = require('fs')
let data = fs.readFileSync('./dock-seed.json', 'utf-8')
data = JSON.parse(data)
data = data.map(el => {
  return {
    ...el,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('tms_docks', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('tms_docks', null, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
