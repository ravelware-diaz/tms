const { sequelize } = require('../models')
const queryAvailable = require('../services/queryAvailable')
const ValidationQueue = require('../helpers/validationQueue');
const assignDock = require('../services/assignDock');
const updateQueueCount = require('../services/updateQueueCount');
const queryEarliestOnProgress = require('../services/queryEarliestOnProgress')
class QueueController {
    static async getTicket(req, res, next) {
        const t = await sequelize.transaction();
        const dataVehicle = req.body.id
        try {
            // const resultQueryAvailable = await queryAvailable(t)
            const resultQueryAvailable = await queryEarliestOnProgress(t)
            // const { flag: flagFetchAvailable } = ValidationQueue.validationFetchAvailable(resultQueryAvailable)
            // !flagFetchAvailable ? resultQueryAvailable = await queryEarliestOnProgress(t) : null
            console.log(resultQueryAvailable, 'NIH DATA')
            console.log(dataVehicle, '<<<<<<<<<<<<<<<<<<<<')
            const resultAssignDock = await assignDock({ dataVehicle, resultQueryAvailable }, t)
            console.log(resultQueryAvailable, '>>>>>>>>>>>>>>>')
            const resultUpdateQueueCount = await updateQueueCount(resultQueryAvailable, 'check_in', t)
            t.commit()
            return res.status(200).json({ 
                status: 'success',
                message: `your vehicle will be load on ${resultQueryAvailable[0].dock_code}`
             })
        } catch (err) {
            console.log(err)
            t.rollback()
        }
    }
}

module.exports = QueueController